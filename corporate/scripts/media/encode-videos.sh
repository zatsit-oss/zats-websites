#!/bin/sh
# Encode team interview sources into web renditions: 720p AV1/Opus WebM + H.264/AAC MP4 fallback.
set -e
SRC="$(dirname "$0")"
OUT="$1"
for f in "$SRC"/*.mp4; do
  name=$(basename "$f" .mp4)
  ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale=-2:720" -c:v libsvtav1 -preset 6 -crf 40 -g 250 -pix_fmt yuv420p \
    -c:a libopus -b:a 64k -ac 2 "$OUT/$name.webm"
  ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale=-2:720" -c:v libx264 -preset slow -crf 28 -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/$name.mp4"
  echo "done $name"
done
