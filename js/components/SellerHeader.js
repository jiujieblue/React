require('../../less/seller-header.less');
var React = require('react');
var SellerHeader = React.createClass({
	render: function() {
		return (
			<div className="seller-header row">
				<div className="seller-header-top">
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
				<div className="seller-header-mid">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="seller-header-mid-box">
									<div>
										<a><span className="icon-cooka"></span></a>								
									</div>
									<div>用户中心</div>
									<div>我是商家</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = SellerHeader;