const prettierConfig = require('./prettier.config.js');

module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-debugger': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    'import/extensions': ['.js', '.jsx', '.json', '.ts', '.tsx'],
    indent: ['error', 2],
    'max-len': [
      1,
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
      },
    ],
    camelcase: [0],
    'consistent-return': [1],
    'array-callback-return': [1],
    'no-underscore-dangle': [1],
    'prettier/prettier': ['error', prettierConfig],
    'react/no-did-mount-set-state': [1],
    'react/require-default-props': [1],
    'react/no-unescaped-entities': [1],
    'react/prefer-stateless-function': [
      0,
      {
        ignorePureComponents: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      1,
      {
        devDependencies: true,
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          every: ['id'],
        },
        allowChildren: false,
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'jsx-a11y/click-events-have-key-events': [1],
    'jsx-a11y/media-has-caption': [0],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'class-methods-use-this': [0],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack/webpack.dev.config.js',
      },
    },
  },
};
