const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  devServer: {
    client: {
      overlay: false
    }
  }
})
