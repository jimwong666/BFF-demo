const {pathResolve, getPackageConfig, getEntry} = require('./utils');

const entryObj = getEntry(pathResolve('src/entry'))
module.exports = {
	entry: entryObj,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [pathResolve('src')],
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', //主要用于编译es6语法和react的jsx语法
					query: {
						cacheDirectory: true //开启缓存，提升速度
					}
					//options请看.babelrc文件
				}
			}
		]
	},
	resolve: {
		modules: [
			pathResolve('src'),
			pathResolve('../node_modules'),
			"node_modules"
		],
		extensions: ['.js', '.jsx', '.scss', '.json'],
		alias: {
			"@": pathResolve('src'),
			"@components": pathResolve('src/components'),
			"@material": pathResolve('src/material'),
			"@generator": pathResolve('src/generator'),
			"@renderer": pathResolve('src/renderer'),
			"@pages": pathResolve('src/pages'),
			"@styles": pathResolve('src/styles'),
			"@images": pathResolve('src/images'),
			"@utils": pathResolve('src/utils'),
			"@router": pathResolve('src/router'),
			"react": pathResolve('../node_modules/react')
		}
	}
};
