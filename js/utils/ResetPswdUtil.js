var request = require('superagent');
var C = require('../C.js');
module.exports = {
	resetPassword: function(d,cb) {
		request
			.post('/cooka-user-web/resetPassword')
			.use(C.ajaxAuth())
			.send(d)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	submitPassword:function(d,cb) {
		request
			.post('/cooka-user-web/submitPassword')
			.use(C.ajaxAuth())
			.send(d)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	resetPasswordTxtMsg:function(d,cb) {
		request
			.post('/cooka-user-web/resetPasswordTxtMsg')
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