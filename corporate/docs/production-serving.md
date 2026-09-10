# Production serving runbook

Everything on this page happens **outside this repository**, in Google Cloud, and none of it is managed by Terraform. It is written down because it is otherwise only in one person's shell history, and because two of these settings look correct while serving nothing.

## What serves zatsit.fr

| Element | Value |
|---|---|
| GCP project | `sites-web-407116` |
| Load balancer | `zatsit-lb-prod` |
| Url map | `wordpress-lb` (the name is inherited from the WordPress era) |
| Backend bucket | `zatsit-corporate-prod-v1`, CDN on, `cacheMode=USE_ORIGIN_HEADERS` |
| Staging bucket | `zatsit-corporate-staging`, served at `website-staging.zatsit.fr` |

`zatsit-terraform` does not know about this project: grepping it for `sites-web`, `407116` or `zatsit-lb-prod` returns nothing. The nginx path in that repository serves `blog.` and `sustainability.`, and its template answers unknown URLs with the home page in `200`, so it can never serve a real 404. Moving `zatsit.fr` there is its own project.

## Deploying to production

**A merge to `main` does not reach production.** `publish-corporate-on-merge.yml` reads

```yaml
environment: ${{ github.event.inputs.env || 'staging' }}
```

so a push has no `inputs.env`, falls back to `staging`, publishes to `zatsit-corporate-staging` and **reports success**. The run is green and production is untouched. The sustainability portal defaults to `production` and does deploy on merge; only corporate has this gate. Whether that default is intended has never been settled.

Production therefore needs a manual dispatch:

```bash
gh workflow run publish-corporate-on-merge.yml -f env=production -f corporate=main
```

Check the run actually targeted the right bucket, since this is the whole failure mode:

```bash
gh run view <run-id> --log | grep "export bucket_name"
# expect: zatsit-corporate-prod-v1
```

## Invalidating the CDN

Objects carry `Cache-Control: public, max-age=300, stale-while-revalidate=86400`, so a stale page can be served for **up to 24 hours** after a deploy while it revalidates in the background. `age` keeps resetting, which makes it look fresh.

```bash
gcloud compute url-maps invalidate-cdn-cache wordpress-lb --path "/*" --project=sites-web-407116 --async
```

Verify against the served response, never against the bucket: `gcloud storage cat` can show the new build while visitors still get the old one.

## Response compression

Fixed on 2026-09-09. Before that the home page was served at **86 466 bytes with no `content-encoding` at all**, against 21 163 gzipped for the blog, on the site whose own pages argue for eco-design.

```bash
gcloud compute backend-buckets update zatsit-corporate-prod-v1 \
  --project=sites-web-407116 --compression-mode=AUTOMATIC
```

Brotli, factor 4.8: `/` went to 17 824 bytes, the main stylesheet from 57 714 to 10 330.

**Do not try to fix this in the publish workflow.** `gcloud storage rsync` only offers `--gzip-in-flight`, which is *transport* encoding: the object lands decompressed and the served response is unchanged. `--gzip-local`, which stores it compressed with the right metadata, exists on `gcloud storage cp` but **not on `rsync`**.

## Security headers and the CSP

Six custom response headers on the backend bucket. This closed six of the twenty SEO issues an audit reported, in one command.

```bash
gcloud compute backend-buckets update zatsit-corporate-prod-v1 \
  --project=sites-web-407116 \
  --custom-response-header="Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.websitecarbon.com; frame-src https://docs.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'" \
  --custom-response-header="Strict-Transport-Security: max-age=31536000" \
  --custom-response-header="X-Content-Type-Options: nosniff" \
  --custom-response-header="X-Frame-Options: DENY" \
  --custom-response-header="Referrer-Policy: strict-origin-when-cross-origin" \
  --custom-response-header="Permissions-Policy: camera=(), microphone=(), geolocation=()"
```

**Repeat the flag, one header per occurrence.** It is not a comma-separated list, and gcloud's `^|^` alternate-delimiter syntax does **not** apply here: passing it stores a single malformed header literally named `^|^Strict-Transport-Security`, the describe output looks plausible, and nothing at all is served. That cost a round trip on 10 September.

**Every call replaces the whole set.** There is no way to add one header, so always send all six.

### Why the CSP has the directives it has

It was derived from the built site rather than guessed, then tested in a headless browser against `/`, `/work-with-us/`, `/join-us/` and `/legal-notice/` before being posted. Two directives are not optional, and testing is what proved it:

- **`frame-src https://docs.google.com`** — the contact form on `/work-with-us/` is a Google Forms iframe. Without this it breaks.
- **`img-src ... data:`** — a first attempt with `img-src 'self'` blocked the external-link icon in `global.css`, a `mask-image: url('data:image/svg+xml…')`. A static grep for `url(data:` missed it because the value is single-quoted; only the browser caught it.
- **`connect-src https://api.websitecarbon.com`** — the carbon badge fetches its measurement at runtime.

`'unsafe-inline'` is needed for both scripts and styles: the layout carries a pre-paint theme script, and static hosting cannot issue nonces.

The badge script itself must stay **self-hosted**. It used to load from `unpkg.com`, and a strict CSP is impossible while a third-party origin executes on the page. If a future change reintroduces an external script, the CSP blocks it silently in the reader's browser and nothing in the build will complain.

### What is deliberately absent from HSTS

No `includeSubDomains` and no `preload`. Browsers cache both, the subdomains cover `blog`, `sustainability`, `preview` and `website-staging`, and the preload list is difficult to leave. Add `includeSubDomains` only after checking every subdomain serves valid HTTPS.

## The two settings that lie

Worth repeating, because both were met in practice:

1. **`compressionMode: AUTOMATIC` reads correct while the CDN still serves uncompressed entries** created before the change. Cache entries filled earlier have no `Vary: Accept-Encoding` and keep being served, for up to the `stale-while-revalidate` window. Invalidate, then verify on `content-encoding` in the response.
2. **A malformed custom response header describes cleanly and serves nothing.** Always verify with `curl -sI`, not with `gcloud ... describe`.

## Verifying the whole thing

```bash
curl -sI -H 'Accept-Encoding: gzip, br' https://zatsit.fr/ | grep -iE \
  'content-encoding|content-security-policy|strict-transport|x-content-type|x-frame|referrer-policy|permissions-policy'

# no third-party script should appear
curl -s https://zatsit.fr/ | grep -oE '<script[^>]*src="https?://[^"]*"'
```

Also see the **Redirects** section of `corporate/README.md`: the legacy WordPress URLs, the trailing-slash 301 and the 404 page are served by this same infrastructure rather than by the build.
