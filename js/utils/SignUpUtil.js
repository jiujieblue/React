var request = require('superagent');
var C = require('../C.js');

module.exports = {
	regist: function(d,cb) {
		request
			.post('/cooka-user-web/regist')
			.use(C.ajaxAuth())
			.send(d)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	registTxtMsg:function(d,cb) {
		request
			.post('/cooka-user-web/registTxtMsg')
			.use(C.ajaxAuth())
			.send(d)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	registTestMobile:function(d,cb) {
		request
			.post('/cooka-user-web/registTestMobile')
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