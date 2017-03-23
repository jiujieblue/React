var request = require('superagent');
var C = require('../C.js');
module.exports = {
	myDetail: function(q,cb) {
		request
			.get('/cooka-productDetail-web/productDetail')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getSide: function(side,cb) {
		request
			.get('/cooka-productDetail-web/recommendProducts')
			.use(C.ajaxAuth())
			.query(side)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getNew: function(q,cb) {
		request
			.get('/cooka-productDetail-web/newestProducts')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	addToCart:function(data,cb){
		request
			.post('/cooka-productDetail-web/m/addToCart')
			.use(C.ajaxAuth())
			.send(data)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}