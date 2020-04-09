const paths = require('./paths');

const resolve = {
  modules: [paths.nodeModulesPath],
  extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
  alias: {
    ...paths.aliases,
    'react-dom': '@hot-loader/react-dom',
  },
};

module.exports = {
  ...resolve,
};
