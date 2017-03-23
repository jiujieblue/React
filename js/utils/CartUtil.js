var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(q,cb) {
		request
			.get('/cooka-cart-web/m/cart')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	deleteItem:function(q,cb) {
		request
			.get('/cooka-cart-web/deleteComItemRestful')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	colle:function(q,cb) {
		request
			.post('/cooka-cart-web/m/addToFavourite')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	updateItem:function(q,cb) {
		request
			.post('/cooka-cart-web/m/updateItem')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	
	delChecked:function(q,cb) {
		request
			.post('/cooka-cart-web/m/deleteItem')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	deleteDisable:function(cb) {
		request
			.post('/cooka-cart-web/m/deleteDisableCartItem')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	}
}