module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/AbischnittRechner/" : "/",
  configureWebpack: {
    devtool: "source-map",
  },
};
