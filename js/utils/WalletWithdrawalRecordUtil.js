var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getRecordData: function(cb) {
		request
			.get('/cooka-finance-web/m/withdrawHistoryForPc')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	subWithdrawSerialnum: function(q,cb) {
		request
			.post('/cooka-finance-web/m/withdrawHistoryForPc')
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