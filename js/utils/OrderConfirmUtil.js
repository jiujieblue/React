var request = require('superagent');

module.exports = {
	getInfo: function(query, cb) {
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