require('../../less/simple-footer.less');

var React = require('react');

var SimpleFooter = React.createClass({
	render: function() {
		return (
			<div className="simple-footer">
				&copy; 2016 广州柯咔网络科技有限公司
			</div>
			);
	}
});

module.exports = SimpleFooter;