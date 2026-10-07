// Dionysus flavour marks, 2026-10-06 (prototype). One set, hand-authored:
// 24x24 grid, one 1.5 stroke, round caps and joins, currentColor, no fills.
// Dots are zero-length strokes (round caps), so the "no fills" rule holds.
// The word always carries the meaning; the mark only speeds recognition.
window.FLAVOUR_ICONS = {
  // a honey dipper: grooved head, its handle, one drop falling (a sugar cube read as a die)
  Sweet: `<path d="M13.3 10.7 20.4 3.6"/><ellipse cx="10" cy="14" rx="4.6" ry="3.4" transform="rotate(-45 10 14)"/><path d="M7 13.3 10.7 17M9.3 11 13 14.7"/><path d="M4.6 18.8c-.8 1.1-1.2 1.8-1.2 2.3a1.2 1.2 0 0 0 2.4 0c0-.5-.4-1.2-1.2-2.3z"/>`,
  // bitters bottle with its dasher cap and a paper label
  Bitter: `<path d="M10.6 3.4h2.8M11 3.4v3M13 3.4v3"/><path d="M11 6.4C8.4 7.6 7.6 9 7.6 11.2v7.6c0 1 .8 1.8 1.8 1.8h5.2c1 0 1.8-.8 1.8-1.8v-7.6c0-2.2-.8-3.6-3.4-4.8"/><path d="M7.6 12.6h8.8M7.6 17h8.8"/>`,
  // chilli: a full curved pod, its calyx and stem
  Spicy: `<path d="M16 8.4c-.6 5.6-4.6 10.4-11.6 12.2 2.4-2.6 3.8-5.6 4.6-8.8.6-2.4 3.2-4.2 7-3.4z"/><path d="M9.6 10.8c1.8-1.6 4.2-2.4 6.4-2.2"/><path d="M16 8.4c.2-1.8 1.2-3.4 3-4.2"/>`,
  // a sprig: one curving stem, leaves alternating up it (paired leaves read as a wheat ear, too close to the Gluten veto)
  Herbal: `<path d="M7.6 21C9.2 14.8 11.6 8.8 16.8 3.4"/><path d="M9.2 16.4c-2.6-.1-4.5-1.5-5.2-3.8 2.6-.3 4.5 1.1 5.2 3.8z"/><path d="M10.9 12.2c2.2-1.2 4.6-1.1 6.3.5-2 1.4-4.5 1.3-6.3-.5z"/><path d="M13.2 7.8c-2.4-.7-3.8-2.4-3.9-4.7 2.4.5 3.9 2.1 3.9 4.7z"/>`,
  // a pair of cherries on one stem, with a leaf
  Fruity: `<circle cx="7.6" cy="16.8" r="3.3"/><circle cx="16.4" cy="17.6" r="3.3"/><path d="M7.6 13.5C8.6 9.4 10.8 6.4 14 4.2M16.4 14.3C15.6 10.6 15 7.4 14 4.2"/><path d="M14 4.2c1.6-1.2 3.7-1.3 5.4-.1-1.6 1.3-3.8 1.4-5.4.1z"/>`,
  // a citrus wedge: the rind, the pith line, three segments
  Citrusy: `<path d="M3.4 10.6a8.6 8.6 0 0 0 17.2 0z"/><path d="M5.6 10.6a6.4 6.4 0 0 0 12.8 0"/><path d="M12 10.6v6.4M12 10.6l-4.4 4.6M12 10.6l4.4 4.6"/>`,
  // one broad mint leaf, midrib and veins
  Fresh: `<path d="M4.6 19.4C4.4 10.6 9.6 4.8 19.4 4.6c.2 9.8-5.6 15-14.8 14.8z"/><path d="M4.6 19.4 14.6 9.4"/><path d="M8.4 15.6V12M11 13v-3.4M8.4 15.6H12M11 13h3.4"/>`,
  // five-petalled blossom around an open centre
  Floral: `<path d="M12 9.8c-1.6-1.6-1.8-4.2 0-6.2 1.8 2 1.6 4.6 0 6.2z"/><path d="M12 9.8c-1.6-1.6-1.8-4.2 0-6.2 1.8 2 1.6 4.6 0 6.2z" transform="rotate(72 12 12)"/><path d="M12 9.8c-1.6-1.6-1.8-4.2 0-6.2 1.8 2 1.6 4.6 0 6.2z" transform="rotate(144 12 12)"/><path d="M12 9.8c-1.6-1.6-1.8-4.2 0-6.2 1.8 2 1.6 4.6 0 6.2z" transform="rotate(216 12 12)"/><path d="M12 9.8c-1.6-1.6-1.8-4.2 0-6.2 1.8 2 1.6 4.6 0 6.2z" transform="rotate(288 12 12)"/><circle cx="12" cy="12" r="1.5"/>`,
  // two wisps of smoke rising from a smouldering line
  Smoky: `<path d="M9.4 18.4c-2.3-2.3-2.3-4.7 0-7s2.3-4.7 0-7"/><path d="M14.6 18.4c-1.9-1.9-1.9-3.9 0-5.8s1.9-3.9 0-5.8"/><path d="M6.4 20.6h11.2"/>`,
};
