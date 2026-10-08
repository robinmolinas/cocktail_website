// The authored copy's own inline emphasis, as plain tokens: `**strong**`,
// `*em*`, and a line break where the author broke a line (a quoted verse).
// Nothing else is interpreted; the words stay verbatim. TheReading renders
// the tokens.

export type InlineToken =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'em'; text: string }
  | { kind: 'break' };

const EMPHASIS = /\*\*([^*]+?)\*\*|\*([^*]+?)\*/g;

export function inlineTokens(text: string): InlineToken[] {
  const out: InlineToken[] = [];
  text.split('\n').forEach((line, i) => {
    if (i > 0) out.push({ kind: 'break' });
    let last = 0;
    for (const match of line.matchAll(EMPHASIS)) {
      const at = match.index ?? 0;
      if (at > last) out.push({ kind: 'text', text: line.slice(last, at) });
      out.push(match[1] !== undefined ? { kind: 'strong', text: match[1] } : { kind: 'em', text: match[2] });
      last = at + match[0].length;
    }
    if (last < line.length) out.push({ kind: 'text', text: line.slice(last) });
  });
  return out;
}
