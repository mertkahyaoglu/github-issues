const { injectBabelPlugin } = require('react-app-rewired');
const theme = require('./src/theme');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    [
      'styled-components',
      {
        displayName: true,
      },
    ],
    config
  );
  return config;
};
