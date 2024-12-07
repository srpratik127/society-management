const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      buffer: path.resolve(__dirname, "node_modules", "buffer"),
      stream: path.resolve(__dirname, "node_modules", "stream-browserify"),
    };

    return config;
  },
};
