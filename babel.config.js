module.exports = function (api) {
    api.cache(true);
    
    return {
      presets: [
        ['babel-preset-expo', {
          jsxRuntime: 'automatic'
        }]
      ],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@': './',
              '@/components': './app/components',
              '@/constants': './app/constants',
              '@/store': './app/store',
              '@/types': './types',
              '@/utils': './utils',
              '@/assets': './assets'
            }
          }
        ],
        'react-native-reanimated/plugin'
      ]
    };
  };