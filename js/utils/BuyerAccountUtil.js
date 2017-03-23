var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-user-web/center/getUserProfile')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getBasic: function(cb) {
		request
			.get('/cooka-user-web/center/getBasicUserProfile')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getStates: function(q,cb) {
		request
			.get('/cooka-user-web/center/selectState')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getCities:function(q,cb) {
		request
			.get('/cooka-user-web/center/selectCity')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	getRegions:function(q,cb) {
		request
			.get('/cooka-user-web/center/selectRegion')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	formSubmit1:function(q,cb) {
		request
			.post('/cooka-user-web/center/updateUserProfile')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	formSubmit2:function(q,cb) {
		request
			.post('/cooka-user-web/center/updateBasicUserProfile')
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