const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  // ... other config
  plugins: [
    new JavaScriptObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75
    }, ['excluded_bundle_name.js'])
  ]
};