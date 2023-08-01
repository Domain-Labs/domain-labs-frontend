const path = require('path');

module.exports = function override(config, env) {
  console.log('override');
  let loaders = config.resolve;
  loaders.fallback = {
    url: require.resolve('url'),
    zlib: require.resolve('browserify-zlib'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
  };
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
