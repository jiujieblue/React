var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(q,cb) {
		request
			.get('/cooka-finance-web/pay')
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