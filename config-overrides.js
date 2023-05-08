module.exports = function override(config, env) {
    console.log("override");
    let loaders = config.resolve;
    loaders.fallback = {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    };
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });
  
    return config;
  };
  