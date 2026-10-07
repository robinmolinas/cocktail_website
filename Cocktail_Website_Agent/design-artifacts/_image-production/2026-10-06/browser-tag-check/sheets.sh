#!/bin/zsh
# Contact sheet per candidate: desktop 1440 (short name), phones 390 (long) and 320 (short),
# then the four tag close-ups (1440 short/long, 390 long, 320 long). Needs ffmpeg.
cd "${0:A:h}/shots" || exit 1
mkdir -p ../sheets
for f in *_w1440_short.jpg; do
  id=${f%_w1440_short.jpg}
  ffmpeg -v error -y -i ${id}_w1440_short.jpg -i ${id}_p390_long.jpg -i ${id}_p320_short.jpg \
    -i ${id}_w1440_short.tag.png -i ${id}_w1440_long.tag.png -i ${id}_p390_long.tag.png -i ${id}_p320_long.tag.png \
    -filter_complex "[0]scale=-2:720[a];[1]scale=-2:720[b];[2]scale=-2:720[c];[a][b][c]hstack=3[top];\
[3]scale=-2:200[t1];[4]scale=-2:200[t2];[5]scale=-2:200[t3];[6]scale=-2:200[t4];[t1][t2][t3][t4]hstack=4[bot];\
[top]scale=1800:-2[T];[bot]scale=1800:-2[B];[T][B]vstack" -q:v 3 ../sheets/${id}.jpg
done
ls ../sheets | wc -l
