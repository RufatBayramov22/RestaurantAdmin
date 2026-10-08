const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  // Keep only safe customizations and inherit all RN defaults (including asset handling).
  maxWorkers: 2,
};

module.exports = mergeConfig(defaultConfig, config);
