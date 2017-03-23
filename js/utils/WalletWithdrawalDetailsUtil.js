var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getDetailsData: function(url,cb) {
		request
			.get('/cooka-finance-web/m/withdrawDetail?withdrawSerialNum='+url)
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}