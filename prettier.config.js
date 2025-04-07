/** @type {import('prettier').Config}*/
const config = {
  trailingComma: 'all',
  semi: false,
  arrowParens: 'avoid',
  singleQuote: true,
  tabWidth: 2,
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}

export default config
