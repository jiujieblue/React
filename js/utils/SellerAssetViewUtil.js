var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-store-web/financialAccount')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}