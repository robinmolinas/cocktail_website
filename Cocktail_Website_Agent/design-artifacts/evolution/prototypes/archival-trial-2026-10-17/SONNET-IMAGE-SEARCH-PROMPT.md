# Prompt: find public-domain archival images for Dionysus stories

Paste everything below the line into Claude Code (model: Sonnet 5.5), opened at
`/Users/robin.molinas/Documents/GenAI Projects`. Edit the PAIRINGS line first.
It only researches and downloads into design-artifacts; nothing in the app changes.

---

You are a picture researcher for Dionysus, a cocktail experience. Every cocktail comes with a short, fact-checked story about a real person, place or moment in drinks history. Above each story we are adding one archival image: a real picture made at the time, which helps the reader feel the story actually happened. Your job is to find the best candidate image for each pairing below, prove that it is free to use, and download it. You are not editing the app.

PAIRINGS: jester-outlaw, magician-regular-guy, lover-hero, caregiver-explorer

## For each pairing, first read the story

1. `Dionysus/Cocktail_Website_Agent/dionysus-experience/shared/data/pours/<pairing>.json`. In `reading.yours`, the story is every paragraph except the last two. Ignore the last two.
2. `Dionysus/Cocktail_Website_Agent/dionysus-experience/shared/data/story-lines.json`, the entry for `<pairing>`. Its `dateline` is the place and time the guest sees.
3. `Dionysus/Cocktail_Website_Agent/design-artifacts/pours/<pairing>.md`. Read the `## Anchors` section and, under `## Dossier`, the "Sources", "Legends and inferences" and "Conflicts" parts. These say what is on the record and what is disputed. Never pick an image that illustrates a legend or a disputed claim as if it were fact.

Write down the 2–4 concrete things the story actually shows: a named person, a named place at that time, a document (a book page, a newspaper, a label, a menu, a patent), or an object. That list is all you may illustrate.

## What counts as a good image, best first

1. The moment itself, for example a photo taken at the event.
2. The person the story is about, from the period.
3. The named place, at or near the story's date.
4. The document the story mentions, such as a real scan of the actual page, newspaper or book.
5. A period illustration of the object or ingredient the story turns on.

Never use:
- AI-generated, "restored", colourised or upscaled images;
- modern photos, stock photos, or photos of today's cocktail;
- generic period images ("a 1920s bar") that are not the story's own person, place or thing;
- caricatures, racist or demeaning imagery, violence, or nudity;
- images of enslaved or colonised people used as decoration.

## Rights: be strict

Accept an image only if a page you can link to shows its status:
- **Wikimedia Commons:** check the file page's licence box, plus the author and date.
- **Library of Congress:** "No known restrictions on publication".
- **Smithsonian Open Access, the Met Open Access, Rijksmuseum, Art Institute of Chicago, NYPL Digital Collections:** each must say "public domain" or CC0.
- **Internet Archive:** only scans of books or periodicals published before 1931.
- **Gallica, the British Library and other national libraries:** each must say public domain.
- **Flickr Commons:** "No known copyright restrictions".

Reject anything from Alamy, Getty, Shutterstock, Pinterest, blogs, museum shops, or any "royalty-free" site. Reject CC BY-SA and CC BY-NC. CC BY 4.0 is a fallback only; mark it as such.

For each image, state why it is public domain in both the US and the UK/EU:
- **US:** published before 1931, or a US federal government work.
- **UK/EU:** the creator died before 1956, or it is anonymous and over 70 years old.

If you cannot prove both, say "unproven" and still list it, ranked last.

The proof has to cover this exact file, not just the moment it shows. Archives often hold several exposures of one scene, and only the one printed in a pre-1931 book or newspaper carries that publication date. Whenever you can, take the scan from the publication itself, for example a book plate on the Internet Archive, Gutenberg or Commons "scanned from …". If you use an archive print, compare it to the published plate by eye (poses, framing) and say whether they match. Never accept a "photographer" credit when that person is in the picture.

## Quality

The image should be 1600 px or more on its long side; 1000 px is the minimum. Prefer the largest original the source offers, not a thumbnail. Check that the image is sharp enough to read at 640 px wide, and that it is not mostly blank or damaged.

## Output

For each pairing, create `Dionysus/Cocktail_Website_Agent/design-artifacts/evolution/prototypes/archival-candidates/<pairing>/` containing:
- the downloaded originals, named `1-<short-name>.<ext>`, `2-…`, best first (1 to 3 candidates);
- `candidates.json`, an array in the same order:

```json
[{
  "file": "1-short-name.jpg",
  "sourcePage": "https://… (the page with the licence)",
  "directUrl": "https://… (the original file)",
  "width": 0, "height": 0,
  "creator": "as the source states, or 'unknown'",
  "date": "as the source states",
  "showsAccordingToSource": "the source's own description, quoted",
  "storyLink": "which fact in the story it shows (cite the Anchor or fact-card row)",
  "licence": "public domain | CC0 | CC BY 4.0 (fallback)",
  "pdReasonUS": "…", "pdReasonUKEU": "…",
  "captionDraft": "What it shows, date (max 48 characters; name people only if the source names them AND that matches the story)",
  "creditDraft": "e.g. 'Library of Congress · public domain'",
  "altDraft": "one plain sentence describing what is visible, not what it means",
  "afterParagraph": 0,
  "confidence": "high | medium | low",
  "concerns": "anything doubtful: identity of people, date, whether it's really that place"
}]
```

`afterParagraph` is the 0-based story paragraph that the image should follow: the one where what it shows first appears.

If you find nothing that meets these rules, write `candidates.json` as `[]` and add a `NOTES.md` listing where you searched. An empty result is better than a weak image.

## How to work

- Search the sources above directly, for example the Commons API: `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=…&format=json`. Then open each file page to read its licence and description.
- Download with `curl -L -A "dionysus-research/1.0"`, then check the size with `file` or `sips -g pixelWidth -g pixelHeight`.
- Look at every image yourself before you list it.
- Don't edit anything outside `archival-candidates/`. Don't touch the app.

Finish with a short table: pairing, best candidate, licence, confidence, and one line on why.
