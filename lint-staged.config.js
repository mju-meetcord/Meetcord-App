module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint', 'eslint --fix', 'prettier --write'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '*.json': ['prettier --write'],
};
