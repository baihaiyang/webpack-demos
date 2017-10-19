var path = require('path');
var jqueryPath = path.join(__dirname, './node_modules/jquery/dist/jquery.js');
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
				loader:'style-loader!css-loader!less-loader'
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(eot|svg|ttf|woff|woff2)$/,
				loader:'url?limit=8192'
			},
			{
				test:/\.(png|jpg|gif)$/,
				loader:'url?limit=8192'
			}
		],
		noParse: [jqueryPath]
	},
	resolve:{
		extensions: [" ",".js",".css",".json",".less"],
		alias: {
			"jquery": jqueryPath
		}
	}
}