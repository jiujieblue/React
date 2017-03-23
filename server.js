var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var fs = require('fs');
var PORT = 3335;

new WebpackDevServer(webpack(config), {
	publicPath: '/build/',
	hot: true,
	stats: {
		colors: true
	},
	proxy: {
		'/cooka-search/*': {
			target: 'http://localhost:8089'
		},
		'/cooka*': {
			target: 'http://localhost:8090'
		},
		'/m/cooka*': {
			target: 'http://localhost:8090'
		}
	}
}).listen(PORT, 'localhost', function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log(':::Server Running::: ==> localhost:' + PORT);
});