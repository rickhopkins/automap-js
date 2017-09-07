var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './examples/src/index',
	output: {
		filename: './examples/automap.example.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js']
	}
};