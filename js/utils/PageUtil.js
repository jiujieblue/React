var request = require('superagent');

module.exports = {
	getPageData: function(cb) {
		request
			.get('https://baconipsum.com/api/?type=meat-and-filler')
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
}