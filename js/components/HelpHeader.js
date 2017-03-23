require('../../less/help-header.less');
var React = require('react');
var HelpHeader = React.createClass({
	render: function() {
		return (
			<div className="help-header row">
				<div className="help-header-top">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<ul>
									<li>
										您好，<a href="#">12345612345<span></span></a>
									</li>
									<li>
										<a href="#">进货单(0)<span></span></a>
									</li>
									<li>
										<a href="#">收藏夹<span></span></a>
									</li>
									<li>
										<a href="#">我是商家<span></span></a>
									</li>
									<li>
										<a href="#">商家入驻</a>
									</li>
								</ul>
							</div>					
						</div>
					</div>
				</div>
				<div className="help-header-mid">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="help-header-mid-box">
									<div>
										<a><span className="icon-cooka"></span></a>								
									</div>
									<div>帮助中心</div>
									<div className="help-info">
										<a>公告信息</a>
										<a>意见反馈</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = HelpHeader;