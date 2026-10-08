# Team interview videos: from source file to the site

Videos are too heavy for the repository. Only the poster images and the captions are versioned; the renditions live in a public GCS bucket declared in `zatsit-terraform` (`zatsit-corporate/media.tf`). This is the whole chain, to add or replace a video.

## Where things live

| What | Where | Versioned |
|---|---|---|
| Source files (`.mp4` originals) | `~/dev/zatsit/media-sources/team-interviews/` | no |
| Web renditions (`web/<name>.webm`, `web/<name>.mp4`) | same folder, `web/` | no |
| Raw Whisper output (`vtt/<name>.fr.vtt`) | same folder, `vtt/` | no |
| Posters (`<slug>.avif`) and cleaned captions (`<slug>.fr.vtt`) | `corporate/public/videos/team/` | yes |
| Interview metadata (name, role, duration, bucket object name) | `corporate/src/content/people/people.json`, key `interviews` | yes |
| Renditions served to visitors | `gs://zatsit-corporate-media-prod/videos/team/` | bucket |

The page reads the bucket through `MEDIA_BASE_URL` (`astro.config.mjs`, default `https://storage.googleapis.com/zatsit-corporate-media-prod`). The `<video>` loads nothing before play (`preload="none"`), so only the poster weighs on the page.

## 1. Encode

Renditions are 720p: AV1 + Opus in WebM (served first), H.264 + AAC in MP4 as the fallback for Safari. From the sources folder:

```sh
./encode.sh web/                         # every *.mp4 in the folder
```

For one file, run the two `ffmpeg` lines of `encode-videos.sh` on that file only. Expect 9 to 15 MB per rendition for a two to three minute interview.

## 2. Poster

One frame, 480p, AVIF (about 15 KB). Pick a second where the person looks at the camera; check a few candidates first:

```sh
for t in 3 8 15; do ffmpeg -ss $t -i <name>.mp4 -frames:v 1 -vf scale=480:-2 thumbs/<name>-$t.jpg; done
ffmpeg -ss 8 -i <name>.mp4 -frames:v 1 -vf "scale=-2:480" -c:v libaom-av1 -still-picture 1 -crf 36 -cpu-used 4 \
  corporate/public/videos/team/<slug>.avif
```

## 3. Captions

Transcribe locally with Whisper (`mlx-whisper` in `~/dev/zatsit/media-sources/.venv`, model `whisper-large-v3-turbo`), then clean the output: `clean-captions.py` fixes Whisper's spellings of the brand and of names, drops filler cues and reflows every cue to two lines of 42 characters.

```sh
cd ~/dev/zatsit/media-sources/team-interviews
HF_HUB_OFFLINE=1 ../.venv/bin/mlx_whisper <name>.mp4 --model mlx-community/whisper-large-v3-turbo \
  --language fr --output-format vtt --output-dir vtt --output-name <name>.fr --condition-on-previous-text False
python3 <repo>/corporate/scripts/media/clean-captions.py vtt/<name>.fr.vtt <repo>/corporate/public/videos/team/<slug>.fr.vtt
```

If the model download stalls, set `HF_HUB_DISABLE_XET=1` for the first run. Add new name corrections to the `FIXES` list of the script. **A human reads the result before it ships**: Whisper invents words on music and off-mic chatter.

## 4. Upload

Objects are published immutable with a one-year cache, so **a replaced video gets a new object name** (`<slug>-v2`, then `-v3`), never the same name overwritten: browsers that cached the old file would keep it.

```sh
gcloud storage cp web/<name>.webm web/<name>.mp4 gs://zatsit-corporate-media-prod/videos/team/ \
  --cache-control="public, max-age=31536000, immutable"
```

Then check from outside: `curl -sI https://storage.googleapis.com/zatsit-corporate-media-prod/videos/team/<name>.webm` must answer `200`, `content-type: video/webm` and the cache header. Listing the bucket is denied on purpose (`403`).

## 5. Declare the interview

In `people.json`, `interviews`: `slug` names the poster and the captions, `media` names the bucket objects when it differs from the slug (a replaced video), `duration` is what the card prints.

```json
{ "slug": "ludovic", "media": "ludovic-v2", "name": "Ludovic Dussart", "role": "CTO associé", "duration": "2 min 27" }
```

Then `npx astro check`, a local build, and play the video from the built site in both themes.

## Rights

The interviews were produced by Welcome to the Jungle ("L'Interview"). Image-rights releases are signed with zatsit; hosting the videos on zatsit.fr is to be confirmed with WTTJ.
