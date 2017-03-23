require('../../less/pay-header.less');
var React = require('react');
var PayHeader = React.createClass({
	render: function() {
		return (
			<div className="pay-header row">
				<div className="pay-header-top">
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
				<div className="pay-header-mid">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="pay-header-mid-box">
									<div>
										<img src="/images/logo.svg" width="150"/>
									</div>
									<div>
										<div>
											<span className="bg">1</span>
											<div>1.进货单</div>
											<span></span>
										</div>
										
										<div>
											<span>2</span>
											<div>2.填写核对订单信息</div>
											<span></span>
										</div>
										
										<div>
											<span>3</span>
											<div>3.在线支付</div>
											<span></span>
										</div>
										
										<div>
											<span>4</span>
											<div>4.完成购买</div>
										</div>
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

module.exports = PayHeader;