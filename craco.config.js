const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0f1e94',
              '@error-color': '#f73481',
              '@warning-color': '#ffc700',
              '@link-color': '#007cad',
              '@info-color': '#1890ff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
