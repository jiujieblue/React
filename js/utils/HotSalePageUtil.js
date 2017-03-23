var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getGoodsInfo: function(query, cb) {
		request
			.get('/cooka-user-web/getIndexGroupProducts')
			.query(query)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getHotSaleGoodsInfo: function(query, cb) {
		request
			.get('/cooka-user-web/getIndexGroupProducts')
			.query(query)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}

};