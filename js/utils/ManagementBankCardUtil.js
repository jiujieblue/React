var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(url,cb) {
		request
			.get(url)
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	submit: function(q,url,cb) {
		request
			.post(url)
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