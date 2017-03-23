var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getWithdrawalData: function(cb) {
		request
			.get('/cooka-store-web/m/withdraw')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	sellerLogin: function(q,cb) {
		request
			.post('/cooka-store-web/m/withdrawHandler')
			.send(q)
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}