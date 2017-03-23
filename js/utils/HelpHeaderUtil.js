var request = require('superagent');
var C = require('../C.js');
module.exports = {
	myFunctionName: function(cb) {
		request
			.get('/some/end/point')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
}