require('../../less/daifa-header.less');
var React = require('react');
var DaifaHeader = React.createClass({
	render: function() {
		return (
			<div className="daifa-header row">
				<div className="daifa-header-top">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<ul>
									<li>
										您好，<a href="#">12345612345<span></span></a>
									</li>
									<li>
										<a href="#">退出</a>
									</li>
								</ul>
							</div>					
						</div>
					</div>
				</div>
				<div className="daifa-header-mid">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="daifa-header-mid-box">
									<div>
										<a><span className="icon-cooka"></span></a>								
									</div>
									<div>用户中心</div>
									<div>我是代发</div>
									<div className="daifa-info">
										<span>HI~12345612345</span>
										<img src="images/detail-look.jpg"/>
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

module.exports = DaifaHeader;