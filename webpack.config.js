var path = require('path');
var jqueryPath = path.join(_dirname, './node_modules/jquery/dist/jquery.js');
function rewriteUrl(replaceUrl){
	return function(req, options){
		req.url = req.path.replace(options.path, replaceUrl);
	}
}
module.exports = {
	// 设置入口文件的绝对路径
	entry:path.resolve('src/index.js'),
	output:{
		path: path.resolve('build'),
		filename:'bundle.js'
	},
	devServer:{
		port: 8080,
		contentBase:'./build'
		// proxy:[
		// 	{
		// 		path:/^\/api\/(.*)/,
		// 		target: 'http://localhost:8080',
		// 		rewrite: rewriteUrl('/$1.json'),
		// 		changeOrigin: true
		// 	}
		// ]
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader'
			},
			{
				test:/\.less$/,
				loader:'style!css!less'
			}
		]
	},
	resolve:{
		extensions: [" ",".js",".css",".json"],
		alias: {
			"jquery": jqueryPath
		}
	}
}