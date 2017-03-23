require('../../less/simple-header.less');

var React = require('react');

var SimpleHeaderTop = React.createClass({
	render: function() {
		return (
			<div className="simple-header-top">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							你好，欢迎光临柯咔商城！
						</div>
						<div className="col-md-6">
							<div className="text-right">
								<a href="/shangjiaruzhu" className="header-top-link">
									商家入驻
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

var SimpleHeader = React.createClass({
	render: function() {
		return (
			<div className="simple-header">
				{ this.props.useTop ? <SimpleHeaderTop /> : null }
				<div className="simple-header-inner">
					<div className="container">
						<div className="col-md-2">
							<div className="simple-header-logo">
								<img src="/images/logo.svg" width="150"/>
							</div>
						</div>
						<div className="col-md-9">
							<h1 className="simple-header-title">{this.props.title}</h1>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = SimpleHeader;