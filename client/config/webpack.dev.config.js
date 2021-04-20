const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const {pathResolve, getPackageConfig, getEntry} = require('./utils');
const webpackConfig = getPackageConfig();
const entryObj = getEntry(pathResolve('src/entry'))

const port = webpackConfig.port || 3000;
const publicPath = '/';
const devApiPath = webpackConfig.devApiPath || 'http://localhost:'+port+'/';

module.exports = merge(webpackBaseConfig, {
    output: {
        filename: '[name].js',
        publicPath: publicPath
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: port,
        compress: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        hot: true,
        open: true,
        openPage: 'http://localhost:'+ port +'/',
        historyApiFallback: { //单页应用刷新页面重定向到对应的单页目录下，以便支持多个单页和多页共存
			rewrites: Object.keys(entryObj).filter(chunkName=>{
                return chunkName.indexOf('/') !== -1;
            }).map(chunkName=>{
                chunkName = chunkName.split('/')[0];
                return {
                    from: new RegExp('^\/'+chunkName+'\/', 'g'),
                    to: '/' + chunkName + '/'
                }
            })
            // rewrites: [
            //     {
            //         from:  /^\/spa2\//g,
            //         to: '/spa2/'
            //     }
            // ]
		},
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [pathResolve('src')],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, //使用import之前还要经过几次loader
                            sourceMap: true,
                            // modules: {
                            //     localIdentName: '[local]--[hash:base64:5]'
                            // }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js') //使用postcss单独的配置文件
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                include: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                include: [pathResolve('src')],
                exclude: /node_modules/,
                use:
                    {
                        loader: 'file-loader',
                        options:
                            {
                                name: '[name].[ext]'
                            }
                    }
            }
        ]
    },
    plugins: [
        new ReactRefreshPlugin(),
        new webpack.DefinePlugin({
            //所有ajax请求的基础url
            'BASE_URL': JSON.stringify(`${devApiPath}`)
        }),
    ].concat(
        Object.keys(entryObj).map(chunkName=>{
            return new HtmlWebpackPlugin({
                title: 'React Scaffold',
                filename: `${chunkName}.html`,
                chunks: [chunkName],
                template: pathResolve('public/index.html'),
                favicon: pathResolve('public/favicon.ico')
            })
        })
    )
})
;
