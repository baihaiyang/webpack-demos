var path = require('path');
module.exports = {
	// 设置入口文件的绝对路径
	entry:path.resolve('src/index.js'),
	output:{
		path: path.resolve('build'),
		filename:'bundle.js'
	}
}