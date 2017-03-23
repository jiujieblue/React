var request = require('superagent');

module.exports = {
	getMyFav: function(q, cb) {
		request
			.get('/cooka-user-web/center/myConcernContent')
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	getSearchProductResult: function(query, cb) {
		request
			.get('/cooka-search/searchProductResult')
			.query(query)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},
	getNewProductResult:function(query, cb){
		request
			.get('/cooka-user-web/center/m/cancelFavoriteStore')
			.query(query)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(res.text);
			});
	}
}