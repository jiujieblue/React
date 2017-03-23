var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getBalanceData: function(cb) {
		request
			.get('/cooka-finance-web/myWallet')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	submitData: function(q,cb) {
		request
			.post('/cooka-finance-web/myWallet')
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