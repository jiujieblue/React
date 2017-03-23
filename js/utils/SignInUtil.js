var request = require('superagent');
var C = require('../C.js');

module.exports = {
	loginPc: function(d,cb) {
		request
			.post('/cooka-user-web/loginPc')
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