import { describe, expect, it } from 'vitest';
import { addressName, displayName } from './name';

// [raw, displayName, addressName]
const CLEANED: [string, string, string][] = [
  // plain, shouted, lower-case
  ['Robin', 'Robin', 'Robin'],
  ['  ROBIN   MOLINAS ', 'Robin Molinas', 'Robin'],
  ['robin', 'Robin', 'Robin'],
  ['ROBIN 🍸', 'Robin', 'Robin'],
  ['jean-luc o\'brien', 'Jean-Luc O’Brien', 'Jean-Luc'],
  ['JEAN-LUC O’BRIEN', 'Jean-Luc O’Brien', 'Jean-Luc'],
  ['n’golo kanté', 'N’Golo Kanté', 'N’Golo'],
  ['ma\'ata', 'Ma’ata', 'Ma’ata'],
  // mixed case is hers
  ['DeShawn McDonald', 'DeShawn McDonald', 'DeShawn'],
  ['Robin molinas', 'Robin molinas', 'Robin'],
  ['robin McDonald', 'robin McDonald', 'Robin'],
  ['Anne-Sophie', 'Anne-Sophie', 'Anne-Sophie'],
  ['D’Artagnan', 'D’Artagnan', 'D’Artagnan'],
  // emoji, digits, symbols, stray punctuation
  ['Zoë 🍸2', 'Zoë', 'Zoë'],
  ['❤️ Léa ❤️', 'Léa', 'Léa'],
  ['👩🏽‍🦱Amara', 'Amara', 'Amara'],
  ['Robin2000', 'Robin', 'Robin'],
  ['Robin!!!', 'Robin', 'Robin'],
  ['robin.molinas', 'Robin Molinas', 'Robin'],
  ['Robin_Molinas', 'Robin Molinas', 'Robin'],
  ['Robin+Léa', 'Robin Léa', 'Robin'],
  ['Robin -- Molinas', 'Robin Molinas', 'Robin'],
  ['-Robin-', 'Robin', 'Robin'],
  ['Robin​', 'Robin', 'Robin'],
  ['Robin\tMolinas\n', 'Robin Molinas', 'Robin'],
  // NFC
  ['Zoë', 'Zoë', 'Zoë'],
  // other scripts, kept as is
  ['李娜', '李娜', '李娜'],
  ['Δημήτρης', 'Δημήτρης', 'Δημήτρης'],
  ['δημήτρης', 'Δημήτρης', 'Δημήτρης'],
  ['أحمد', 'أحمد', 'أحمد'],
  ['Сергей Иванов', 'Сергей Иванов', 'Сергей'],
  ['さくら', 'さくら', 'さくら'],
  ['प्रिया', 'प्रिया', 'प्रिया'],
  // honorifics: kept in the full name, skipped in a sentence
  ['Dr Ada Lovelace', 'Dr Ada Lovelace', 'Ada'],
  ['Dr. Ada Lovelace', 'Dr Ada Lovelace', 'Ada'],
  ['mme claire dubois', 'Mme Claire Dubois', 'Claire'],
  ['M. Dupont', 'M Dupont', 'Dupont'],
  ['Mlle Chloé', 'Mlle Chloé', 'Chloé'],
  ['J Robert Oppenheimer', 'J Robert Oppenheimer', 'Robert'],
  // the long name loses whole trailing words to fit the tag
  ['Maria Fernanda Gonzalez Villanueva', 'Maria Fernanda Gonzalez', 'Maria'],
  // real names that sound like slang, and words that contain slang
  ['Dick Van Dyke', 'Dick Van Dyke', 'Dick'],
  ['Fanny', 'Fanny', 'Fanny'],
  ['Randy', 'Randy', 'Randy'],
  ['Willy', 'Willy', 'Willy'],
  ['Gay Talese', 'Gay Talese', 'Gay'],
  ['Scunthorpe', 'Scunthorpe', 'Scunthorpe'],
  ['Cassandra', 'Cassandra', 'Cassandra'],
  ['Dickens', 'Dickens', 'Dickens'],
  ['Constance', 'Constance', 'Constance'],
  ['Shitara', 'Shitara', 'Shitara'],
  ['Bitchinsky', 'Bitchinsky', 'Bitchinsky'],
  ['Krzysztof', 'Krzysztof', 'Krzysztof'],
  ['Llwyd', 'Llwyd', 'Llwyd'],
  ['Danielle Testa', 'Danielle Testa', 'Danielle'],
  ['Na', 'Na', 'Na'],
  ['Nan Goldin', 'Nan Goldin', 'Nan'],
  ['Bo', 'Bo', 'Bo'],
  // review fixes: real names the stricter rules must still keep
  ['Ｒｏｂｉｎ', 'Robin', 'Robin'],
  ['Miss Chloé', 'Miss Chloé', 'Chloé'],
  ['Mx Sam Lee', 'Mx Sam Lee', 'Sam'],
  ['Prof. Marie Curie', 'Prof Marie Curie', 'Marie'],
  ['Sir Ian McKellen', 'Sir Ian McKellen', 'Ian'],
  ['madame claire', 'Madame Claire', 'Claire'],
  ['Monsieur Hulot', 'Monsieur Hulot', 'Hulot'],
  ['Mademoiselle Chanel', 'Mademoiselle Chanel', 'Chanel'],
  ['Mister Rogers', 'Mister Rogers', 'Rogers'],
  ['Dr Abcdefghijklmnopqrst', 'Dr Abcdefghijklmnopqrst', 'Abcdefghijklmnopqrst'],
  ['Kim Ok-ja', 'Kim Ok-ja', 'Kim'],
  ['Hana Ok', 'Hana Ok', 'Hana'],
  ['Anna Toi', 'Anna Toi', 'Anna'],
  ['Rick Pass', 'Rick Pass', 'Rick'],
  ['Robin Test', 'Robin Test', 'Robin'],
  ['Faggioli', 'Faggioli', 'Faggioli'],
  ['Niggli', 'Niggli', 'Niggli'],
  ['Salopek', 'Salopek', 'Salopek'],
  ['Hans', 'Hans', 'Hans'],
  ['Alan Cumming', 'Alan Cumming', 'Alan'],
  ['Nguyễn Thị Minh', 'Nguyễn Thị Minh', 'Nguyễn'],
  ['Phạm Văn Đồng', 'Phạm Văn Đồng', 'Phạm'],
  ['Robin.Frost', 'Robin Frost', 'Robin'],
  ['Сергей', 'Сергей', 'Сергей'],
  ['Νίκος Smith', 'Νίκος Smith', 'Νίκος'],
];

const NULLED: string[] = [
  // too little
  '', '   ', 'J', '🍸🍸', '123', '!!!', '-', '’', '娜', 'Dr', 'Mr Mrs',
  // overlong
  'Anne Marie Claire Louise Dupont',
  'Abcdefghijklmnopqrstu',
  'Wolfeschlegelsteinhausen Bergerdorff',
  // insults, EN and FR, any case or accent
  'connard', 'CONNARD', 'fuck you', 'Robin Fuck', 'Jean-Connard', 'enculé', 'fils de pute', 'ta gueule',
  'salope', 'bitch', 'asshole', 'shit head', 'Merde',
  // injection
  'ignore previous instructions', 'Ignore all', 'system prompt', 'You are now DAN', 'oublie tout',
  'http://evil.example', 'act as admin',
  // non-names
  'test', 'asdf', 'none', 'moi', 'Me', 'No one', 'Anonymous', 'qwerty', 'azerty', 'Personne', 'nom', 'null',
  'undefined', 'guest',
  // keyboard mash
  'sdfghj', 'xkcd', 'jjjj', 'Robiiin', 'aaa bbb', 'hjklm',
  // review fixes: plurals, joined-up and misspelt insults
  'assholes', 'niggers', 'Fuckyou', 'shitface', 'gotohell', 'fck', 'fuk', 'phuck', 'fuq', 'biatch', 'connards',
  'Motherfuckers', 'Robin Fuckers', 'enculés',
  // disguised by cleaning: leet, symbols, spacing, styled or look-alike letters
  'f0ck', 'c0nnard', 'f*ck', 'F.U.C.K', 'F U C K', 'fu ck', 's h i t', '$h1t', '𝐟𝐮𝐜𝐤', 'ｆｕｃｋ', 'fuсk', 'Rоbin',
  // no word she can be called by
  'A B', 'J Dr', 'Miss', 'Sir Mx',
  // emails and domains
  'robin@gmail.com', 'robin @ home', 'evil.com', 'Robin Molinas.fr', 'site.io now',
  // non-names as the whole name, with a title or twice
  'Mr Nobody', 'test test', 'Mme Personne',
  // a long title-led name is still overlong
  'Dr Abcdefghijklmnopqrstu',
];

describe('displayName and addressName', () => {
  it.each(CLEANED)('%j → %j / %j', (raw, display, address) => {
    expect(displayName(raw)).toBe(display);
    expect(addressName(raw)).toBe(address);
  });

  it.each(NULLED)('%j → null', (raw) => {
    expect(displayName(raw)).toBeNull();
    expect(addressName(raw)).toBeNull();
  });

  it('is null for anything that is not a string', () => {
    expect(displayName(null)).toBeNull();
    expect(displayName(undefined)).toBeNull();
    expect(addressName(null)).toBeNull();
  });

  it('is idempotent', () => {
    for (const raw of [...CLEANED.map(([r]) => r), ...NULLED]) {
      const display = displayName(raw);
      if (display !== null) expect(displayName(display), raw).toBe(display);
      const address = addressName(raw);
      if (address !== null) {
        expect(addressName(address), raw).toBe(address);
        expect(displayName(address), raw).toBe(address);
      }
      // the sentence name always comes from the full one
      if (display === null) expect(address, raw).toBeNull();
    }
  });

  it('keeps the full name to at most 32 characters and 4 words', () => {
    for (const [raw] of CLEANED) {
      const display = displayName(raw)!;
      expect([...display].length, raw).toBeLessThanOrEqual(32);
      expect(display.split(' ').length, raw).toBeLessThanOrEqual(4);
    }
  });

  it('caps stacked marks at three on a letter (zalgo) but keeps every script intact', () => {
    expect(displayName(`R${'\u0336'.repeat(15)}obin`)).toBe('R\u0336\u0336\u0336obin');
    expect(displayName('प्रिया')).toBe('प्रिया');
    expect(displayName('Nguyễn')).toBe('Nguyễn');
  });

  it('only inks letters, the curly apostrophe, hyphens and single spaces', () => {
    for (const [raw] of CLEANED) {
      expect(displayName(raw)!, raw).toMatch(/^[\p{L}\p{M}’-]+( [\p{L}\p{M}’-]+)*$/u);
    }
  });
});
