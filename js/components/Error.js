require('../../less/error.less');
var React = require('react');
var Error = React.createClass({
	handleClick:function(){
		location.href='http://hao123.com'
	},
	render: function () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="error">
						<img src='images/error404.jpg'/>
						<p><button type='button' onClick={this.handleClick}>返回首页</button></p>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Error;