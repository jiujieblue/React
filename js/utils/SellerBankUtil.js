var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-store-web/m/myBankCard')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	delCard: function(q,cb) {
		request
			.post('/cooka-store-web/m/deleteBankCardHandler')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	addCard: function(q,cb) {
		request
			.post('/cooka-store-web/m/editBankCard')
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