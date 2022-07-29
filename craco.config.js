const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#20c997',
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
