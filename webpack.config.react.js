var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-pligin');
var webpack = require('webpack');
module.exports = {
	entry: path.resolve(__dirname, 'react/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				// loader: 'babel',
				// query: {presets:["es2015","react"]},
				loaders: ['react-hot','babel?presets[]=es2015&presets[]=react']
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'react')
			}
		]
	},
	devServer: {
		hot: true,
		inline: true,
		stats: {colors: true},
		port: 8080,
		contentBase: 'build'
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:'baihiayang',
			template:'./react/index.html'
		}),
		new openBrowserWebpackPlugin({
			url: 'http://localhost:8080'
		}),
		new webpack.HotModleReplacementPlugin()
	]
};