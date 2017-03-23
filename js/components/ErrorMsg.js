var React = require('react');

var ErrorMsg = React.createClass({
	getDefaultProps: function() {
		return {
			error: ''
		}
	},
	render: function() {
		if (!this.props.error) {
			return null;
		}

		return (
			<div className="alert alert-danger">
				{this.props.error}
			</div>
			);
	}
});

module.exports = ErrorMsg;