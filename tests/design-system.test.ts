import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const parse = (block: string) => Object.fromEntries([...block.matchAll(/(--color-[\w-]+):\s*(#[a-f\d]{6})/gi)].map(match => [match[1], match[2]]));
const light = parse(css.match(/:root\s*\{([^}]+)\}/)?.[1] ?? '');
const dark = parse(css.match(/:root\[data-theme='dark'\]\s*\{([^}]+)\}/)?.[1] ?? '');
const systemDark = parse(css.match(/:root:not\(\[data-theme='light'\]\)\s*\{([^}]+)\}/)?.[1] ?? '');
function luminance(hex: string) {
  const values = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return (values[0] ?? 0) * .2126 + (values[1] ?? 0) * .7152 + (values[2] ?? 0) * .0722;
}
function contrast(a: string, b: string) {
  const [first, second] = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return ((first ?? 0) + .05) / ((second ?? 0) + .05);
}
test('text, tags, buttons and focus meet token-level AA contrast in both themes', () => {
  for (const [theme, palette] of Object.entries({ light, dark })) {
    for (const background of ['bg', 'surface', 'soft', 'selected']) {
      for (const foreground of ['text', 'muted', 'primary']) {
        const ratio = contrast(palette[`--color-${foreground}`] ?? '', palette[`--color-${background}`] ?? '');
        assert.ok(ratio >= 4.5, `${theme}: ${foreground}/${background} = ${ratio.toFixed(2)}`);
      }
      for (const foreground of ['focus', 'control-border']) {
        const ratio = contrast(palette[`--color-${foreground}`] ?? '', palette[`--color-${background}`] ?? '');
        assert.ok(ratio >= 3, `${theme}: ${foreground}/${background} = ${ratio.toFixed(2)}`);
      }
    }
    for (const background of ['primary', 'primary-hover']) {
      assert.ok(contrast(palette['--color-primary-ink'] ?? '', palette[`--color-${background}`] ?? '') >= 4.5, `${theme}: primary button`);
    }
  }
});
test('system dark preference uses the same palette as explicit dark mode', () => {
  assert.ok(Object.keys(dark).length > 0);
  assert.deepEqual(systemDark, dark);
});
