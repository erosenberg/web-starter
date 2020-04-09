const {
  NODE_ENV,
  BABEL_ENV,
  DEV_SERVER_PORT,
} = process.env;

module.exports = {
  NODE_ENV: NODE_ENV || 'development',
  BABEL_ENV: BABEL_ENV || 'development',
  DEV_SERVER_PORT,
};
