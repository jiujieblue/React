var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-product-web/forAddProduct')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	nextStep: function(q,cb) {
		request
			.get('/cooka-product-web/getDataForAddProduct')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}