const path = require('path')

module.exports = {
  mode : 'production',
	entry: {
		model: './src/script.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
	}
}
