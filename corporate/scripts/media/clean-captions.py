#!/usr/bin/env python3
"""Clean Whisper WebVTT output for the team interview videos.

Fixes known transcription errors (brand and people names, tech terms), drops
empty or filler cues, and reflows every cue to at most two lines of 42
characters, splitting long cues in time proportionally to their text.

Usage: clean-captions.py <input.vtt> <output.vtt>
"""
import re
import sys

MAX_LINE = 42
MAX_LINES = 2

# Whisper hears "zatsit" in many ways; normalise them all.
BRAND = re.compile(r"\b(?:Zad ?S[ie]a?te?|Zad ?[Cc]ite|Zadzit|ZadSite?|ZATSIT|ZSIT|AdSite|Zad ?Seat|Zatsit)\b")

FIXES = [
    (r"\bZadsté\b|\bZADD\b", "Zatsday"),
    (r"Célia Dolage", "Célia Doolaeghe"),
    (r"Flavien Bayeul", "Flavien Bailleul"),
    (r"Ludovic Dussard", "Ludovic Dussart"),
    (r"Emmanuel Perru", "Emmanuel Péru"),
    (r"un sitio associé", "CTO associé"),
    (r"\bThink API\b", "AsyncAPI"),
    (r"javaspring boot", "Java Spring Boot"),
    (r"\bnuxt\b", "Nuxt"),
    (r"\bback market\b", "Back Market"),
    (r"GitHub Action\b", "GitHub Actions"),
    (r"une escène", "une ESN"),
    (r"apétance", "appétence"),
    (r"\bvient (semer|et contribue)", r"viens \1"),
    (r"tu es sorti une mission", "tu es sorti de mission"),
    (r"Doctor House", "Dr House"),
    (r"sein de son essai", "sein de son SI"),
    # Whisper dropped the article across a cue boundary ("accueillir dans" | "collectif.")
    (r"^collectif\. Est-ce", "le collectif. Est-ce"),
]

TIME = re.compile(r"^(?:(\d+):)?(\d+):(\d+\.\d+) --> (?:(\d+):)?(\d+):(\d+\.\d+)")


def to_seconds(h, m, s):
    return int(h or 0) * 3600 + int(m) * 60 + float(s)


def fmt(t):
    h, rest = divmod(t, 3600)
    m, s = divmod(rest, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"


def clean_text(text):
    # The brand is sometimes cut across two cues ("Zad" | "Seat ...")
    text = re.sub(r"\bZad$", "zatsit", text.strip())
    text = re.sub(r"^Seat\b", "", text)
    text = BRAND.sub("zatsit", text)
    for pattern, repl in FIXES:
        text = re.sub(pattern, repl, text)
    return re.sub(r"\s+", " ", text).strip()


def wrap(text):
    lines, current = [], ""
    for word in text.split(" "):
        if current and len(current) + 1 + len(word) > MAX_LINE:
            lines.append(current)
            current = word
        else:
            current = f"{current} {word}".strip()
    if current:
        lines.append(current)
    return lines


def parse(path):
    cues, start, end, buf = [], None, None, []
    for raw in open(path, encoding="utf-8").read().splitlines() + [""]:
        match = TIME.match(raw)
        if match:
            g = match.groups()
            start, end, buf = to_seconds(*g[0:3]), to_seconds(*g[3:6]), []
        elif raw.strip() == "" and start is not None:
            cues.append((start, end, " ".join(buf)))
            start = None
        elif start is not None:
            buf.append(raw.strip())
    return cues


def main(src, dst):
    out = ["WEBVTT", ""]
    for start, end, text in parse(src):
        text = clean_text(text)
        # Skip silence markers and zero-length cues Whisper emits over music
        if not re.search(r"\w", text) or end <= start:
            continue
        lines = wrap(text)
        chunks = [lines[i:i + MAX_LINES] for i in range(0, len(lines), MAX_LINES)]
        total = sum(len(" ".join(c)) for c in chunks)
        t = start
        for chunk in chunks:
            share = (end - start) * len(" ".join(chunk)) / total
            out += [f"{fmt(t)} --> {fmt(t + share)}", *chunk, ""]
            t += share
    open(dst, "w", encoding="utf-8").write("\n".join(out))


if __name__ == "__main__":
    main(*sys.argv[1:3])
