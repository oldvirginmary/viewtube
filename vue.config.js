module.exports = {
  // transpileDependencies: ["ant-design-vue"], // очень долгая стройка (лучше оставить для производства)
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "font-size-base": "18px",
            "layout-body-background": "#FFFFFF",
            "layout-header-background": "#FFFFFF",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};