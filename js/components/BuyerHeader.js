require('../../less/buyer-header.less');
var React = require('react');
var BuyerHeader = React.createClass({
	render: function() {
		return (
			<div className="buyer-header row">
				<div className="buyer-header-top">
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
				<div className="buyer-header-mid">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="buyer-header-mid-box">
									<div>
										<a><span className="icon-cooka"></span></a>								
									</div>
									<div>用户中心</div>
									<div>我是买家</div>
									<div className="buyer-info">
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

module.exports = BuyerHeader;