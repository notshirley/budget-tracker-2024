const { plugins } = require("@babel/preset-env/lib/plugins-compat-data");

module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }]
    ],
    parserOpts: { allowReturnOutsideFunction: true },
    plugins: [
      "@babel/plugin-syntax-jsx"
    ]
  };
  