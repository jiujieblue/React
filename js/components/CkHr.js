require('../../less/ck-hr.less');

var React = require('react');
var CkHr = React.createClass({
	render: function() {
		return (
			<div className="ck-hr">
				<span className="ck-hr-text">
				cookabuy.com
				</span>
			</div>
			);
	}
});
module.exports = CkHr;