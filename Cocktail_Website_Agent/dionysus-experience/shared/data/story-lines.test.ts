// The story's dateline and archival image (designer review, 2026-10-17):
// every authored pour has one, and each image sits inside its story.

import { describe, expect, it } from 'vitest';
import { AUTHORED_POURS } from './pours/static';
import storyLines from './story-lines.json';

type Line = { dateline: string; trueStory: boolean; image?: { after: number; alt: string } };
const LINES = storyLines as Record<string, Line>;
const authored = Object.entries(AUTHORED_POURS);

describe('story lines', () => {
  it('cover every authored pour, and nothing else', () => {
    expect(Object.keys(LINES).sort()).toEqual(authored.map(([k]) => k).sort());
  });

  it.each(authored)('%s: has a short dateline', (key) => {
    const line = LINES[key];
    expect(line.dateline.length).toBeGreaterThan(0);
    expect(line.dateline.length).toBeLessThanOrEqual(34);
    expect(typeof line.trueStory).toBe('boolean');
  });

  it('archival images sit after a story paragraph, and say what they show', () => {
    for (const [key, line] of Object.entries(LINES)) {
      if (!line.image) continue;
      const story = AUTHORED_POURS[key as keyof typeof AUTHORED_POURS]!.reading.yours.slice(0, -2);
      expect(line.image.after).toBeLessThan(story.length);
      expect(line.image.alt.length).toBeGreaterThan(20);
    }
  });
});
