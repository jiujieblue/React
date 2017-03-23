var request = require('superagent');
var C = require('../C.js');
module.exports = {
	registStore: function(d,cb) {
		request
			.post('/cooka-user-web/registStore')
			.use(C.ajaxAuth())
			.send(d)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getMarkets: function(d,cb) {
		request
			.post('/cooka-user-web/getMarkets')
			.use(C.ajaxAuth())
			.send(d)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getCats: function(d,cb) {
		request
			.post('/cooka-user-web/getCats')
			.use(C.ajaxAuth())
			.send(d)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}