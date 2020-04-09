module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: { version: 3, proposals: true },
        useBuiltIns: 'entry',
        loose: true,
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'IE >= 9'],
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel'
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-transform-runtime',
      ],
    },
  },
};
