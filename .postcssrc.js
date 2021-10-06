module.exports = {
  plugins: {
    // vue cli 中默认有 autoprefixer 插件
    // 'autoprefixer': {
    //   overrideBrowserslist: [
    //     "Android 4.1",
    //     "iOS 7.1",
    //     "Chrome > 31",
    //     "ff > 31",
    //     "ie >= 8"
    //   ]
    // },
    // 配置使用 postcss-pxtorem 插件，把 px 转为 rem
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}