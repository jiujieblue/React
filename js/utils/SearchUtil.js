var request = require('superagent');

module.exports = {
	getData: function(data,cb) {
		request
			.get('/cooka-search/searchPcProductResult')
			.query(data)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},
	getHotSaleGoodsInfo: function(query, cb) {
		request
			.get('/cooka-user-web/getIndexGroupProducts')
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
}