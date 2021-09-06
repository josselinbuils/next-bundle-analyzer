module.exports = [
  {
    regex: /\.(js|tsx?)$/,
    commands: ['eslint'],
  },
  {
    regex: /\.(js|md|tsx?|scss)$/,
    commands: ['prettier --write', 'git add'],
  },
];
