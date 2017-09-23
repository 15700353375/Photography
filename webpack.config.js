
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
module.exports = {
  // 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。
  // 这个选项可以在不影响构建速度的前提下生成完整的sourcemap，
  // 但是对打包后输出的JS文件的执行具有性能和安全的隐患。
  // 在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
  // devtool: 'eval-source-map',
  entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
  // output: {
  //   path: __dirname + "/public",//打包后的文件存放的地方
  //   filename: "bundle.js"//打包后输出文件的文件名
  // },
  output: {
    path: __dirname + "/dist",
    filename: "bundle-[hash].js"
  },

  devServer: {
    // 设置默认监听端口，如果省略，默认为”8080“
    port: 2222,
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            // 可以直接把CSS的类名传递到组件的代码中，且这样做只对当前组件有效，不必担心在不同的模块中使用相同的类名造成冲突
            options: {
              modules: true
            }
          }, {
            // 自动添加浏览器前缀的loader
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader']
      }


    ]
  },

  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],

}
