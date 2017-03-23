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
	}
}