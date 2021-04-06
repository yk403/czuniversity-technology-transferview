module.exports = {
	publicPath: './',
	lintOnSave: false,
	devServer: {
		port: process.env.NODE_ENV == "production" ? 10000 : 11000,
/*		proxy: {
			'/api': {
				//target: process.env.VUE_APP_URL,
				target: 'http://172.21.25.8:11004',
				// 允许跨域
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
					//'^/api': ''
				}
			}
		}*/
	},
	configureWebpack: {
		devtool: 'source-map',//默认是：cheap-module-eval-source-map
	}
}

// const path = require('path')
// module.exports = {
// 	publicPath: './',
// 	devServer: {
// 		port: process.env.NODE_ENV == "production" ? 10000 : 11000,
// 		proxy: {
// 			'/api': {
// 				target: process.env.VUE_APP_URL,
// 				// 允许跨域
// 				changeOrigin: true,
// 				ws: true,
// 				pathRewrite: {
// 					'^/api': ''
// 				}
// 			}
// 		}
// 	},
// 	// configureWebpack: {
// 	// 	devtool: 'source-map',//默认是：cheap-module-eval-source-map
// 	// }
// 	configureWebpack: (config) => {
// 		Object.assign(config, {
// 		resolve: {
// 			alias: {
// 			'@': path.resolve(__dirname, './src'),
// 			'@images': path.resolve(__dirname, './src/assets'),
// 			// api: path.resolve(__dirname, './src/api'),
// 			'@views': path.resolve(__dirname, './src/views')
// 			}
// 		}
// 		})
// 	}
// }