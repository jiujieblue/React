var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-user-web/center/myFavouriteProduct')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	delshixiao:function(cb){
		request
			.get('/cooka-user-web/center/deleteInvalid')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	del:function(q,cb){
		request
			.post('/cooka-user-web/center/deleteFavoriteProducts')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	}
}