var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-store-web/transactionDetail')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	search: function(q,cb) {
		request
			.post('/cooka-store-web/transactionDetail')
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