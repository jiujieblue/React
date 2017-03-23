module.exports = {
	ajaxAuth: function() {
		return function(req) {
			// req.set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
			req.on('response', function(res) {
				if (res.status === 401) {
					window.location = '/cooka-user-web/login';
				}
			});
		};
	}
}