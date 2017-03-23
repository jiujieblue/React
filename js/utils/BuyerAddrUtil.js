var request = require('superagent');
var C = require('../C.js');
module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-user-web/center/myAddress')
			.use(C.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	defaultAddr:function(q,cb) {
		request
			.post('/cooka-user-web/center/updateDefaultAddrHandler')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	delAddr:function(q,cb) {
		request
			.get('/cooka-user-web/center/deleteUserAddrHandler')
			.use(C.ajaxAuth())
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	newAddrProvince:function(q,cb) {
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
	newAddrCity:function(q,cb) {
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
	newAddrArea:function(q,cb) {
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
	newAddrForm:function(q,cb) {
		request
			.post('/cooka-user-web/center/addUserAddrHandler')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
	updateAddrForm:function(q,cb) {
		request
			.post('/cooka-user-web/center/updateUserAddrHandler')
			.use(C.ajaxAuth())
			.send(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(res.text);
			});
	},
}