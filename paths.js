const path = require('path');

const projectPath = path.resolve(__dirname);

const staticPath = path.resolve(projectPath, 'static');
const buildPath = path.resolve(staticPath, 'build');
const srcPath = path.resolve(projectPath, 'src');
const indexPath = path.resolve(srcPath, 'index.tsx');
const imagesPath = path.resolve(buildPath, 'images');
const nodeModulesPath = path.resolve(projectPath, 'node_modules');
const indexViewPath = path.resolve(staticPath, 'index.html');

const webpackResolve = path.resolve(
  projectPath,
  'webpack.resolve.config.js',
);

const aliases = {
  assets: path.resolve(srcPath, 'assets/'),
  styles: path.resolve(srcPath, 'styles/'),
  utils: path.resolve(srcPath, 'utils/'),
  views: path.resolve(srcPath, 'views/'),
};

module.exports = {
  staticPath,
  buildPath,
  srcPath,
  indexPath,
  nodeModulesPath,
  projectPath,
  imagesPath,
  indexViewPath,
  aliases,
  webpackResolve,
};
