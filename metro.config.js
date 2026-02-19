const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Reduce file watching overhead
    unstable_enablePackageExports: true,
  },
  transformer: {
    // Enable Hermes for better performance
    hermes: true,
    // Reduce transform overhead
    asyncRequireModulePath: require.resolve('metro-runtime/src/modules/asyncRequire'),
  },
  serializer: {
    // Optimize bundle creation
    createModuleIdFactory: () => (path) => {
      // Use shorter module IDs for smaller bundles
      const projectRootPath = __dirname;
      return path.substr(projectRootPath.length + 1);
    },
  },
  // Reduce memory usage
  maxWorkers: 2,
  resetCache: false,
};
