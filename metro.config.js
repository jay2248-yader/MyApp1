const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Workaround for Metro version compatibility issues
// This prevents the importLocationsPlugin error by using a simplified configuration
config.serializer = {
  ...config.serializer,
  customSerializer: undefined,
};

module.exports = config;