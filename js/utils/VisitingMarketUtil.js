var request = require('superagent');

module.exports = {
	getMarketCotegoryInfo: function(query, cb) {
		request
			.get('/cooka-search/searchPcMarketStoreResult')
			.query(query)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getPopularRecommendedInfo: function(query, cb) {
		request
			.get('/cooka-user-web/getIndexGroupProducts')
			.query(query)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}

};