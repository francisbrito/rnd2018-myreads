module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
