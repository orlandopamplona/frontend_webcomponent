const path = require("path")
const webpackConfig = require('./webpack.dev');

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    client: {
      clearContext: false
    },
    files: [
      "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
      { pattern: "./indexTest.js", type: "module", included: true }
    ],
    exclude: [],
    preprocessors: {
      "./indexTest.js": [ "webpack", 'sourcemap' ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
    reporters: ["spec"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome", "Firefox", "Edge", "Opera"],
    singleRun: true,
    concurrency: 1,
    captureTimeout: 1500000,
    browserDisconnectTimeout: 2000000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 2000000
  });
};
