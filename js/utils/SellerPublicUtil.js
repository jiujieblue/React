var request = require('superagent');
var C = require('../C.js');
module.exports = {
	shopPublic: function(cb) {
		request
			.get('/cooka-user-web/getSellerAnnouncement')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	marketPublic: function(cb) {
		request
			.get('/cooka-user-web/marketNotices')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}