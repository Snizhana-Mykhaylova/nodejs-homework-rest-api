module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'require-jsdoc': 'off',
  },
};
