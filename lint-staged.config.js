module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.ts?(x)': ['build:types'],
  '*.json': ['prettier --write'],
};
