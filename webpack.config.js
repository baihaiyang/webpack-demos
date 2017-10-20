var path = require('path');
var jqueryPath = path.join(__dirname, './node_modules/jquery/dist/jquery.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');
var definePlugin = new webpack.DefinePlugin({
	__DEV__ : (process.env.BUILD_dev || 'dev').trim() == 'dev'
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');
function rewriteUrl(replaceUrl){
	return function(req, options){
		req.url = req.path.replace(options.path, replaceUrl);
	}
}
module.exports = {
	// 设置入口文件的绝对路径
	entry:{
		a:path.resolve('src/a.js'),
		b:path.resolve('src/b.js')
	},
	output:{
		path: path.resolve(__dirname, 'build'),
		filename:'[name].[hash].js'
	},
	devServer:{
		port: 8080,
		contentBase:'./build',
		inline: true,
		proxy:[
			{
				path:/^\/api\/(.*)/,
				target: 'http://localhost:8080',
				rewrite: rewriteUrl('/$1.json'),
				changeOrigin: true
			}
		]
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader'
			},
			{
				test:/\.less$/,
				loader:ExtractTextPlugin.extract("style-loader","css-loader!less-loader")
			},
			{
				test:/\.css$/,
				loader: ExtractTextPlugin.extract("style-loader","css-loader")
			},
			{
				test:/\.(eot|svg|ttf|woff|woff2)$/,
				loader:'url?limit=8192'
			},
			{
				test:/\.(png|jpg|gif)$/,
				loader:'url?limit=8192'
			},
			{
				test:/jquery.js$/,
				loader: "expose?jQuery"
			}
		],
		noParse: [jqueryPath]
	},
	resolve:{
		extensions: [" ",".js",".css",".json",".less"],
		alias: {
			"jquery": jqueryPath
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			title: 'baihaiyang-webpack',
			template: './src/index.html',
			filename: './a.html',
			chunks:['a','common.js']
		}),
		new openBrowserWebpackPlugin({
			url:'http://loaclhost:8080'
		}),
		definePlugin,
		new ExtractTextPlugin('bundle.css'),
		new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new HtmlWebpackPlugin({
			title: 'baihaiyang-webpack',
			template: './sec/index.html',
			filename: './b.html',
			chunks: ['b','common.js']
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.MinChunkSizePlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
		})
	]
}