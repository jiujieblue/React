var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(query, cb) {
		request
			.get('')
			.query(query)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}

};