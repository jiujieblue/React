require('../../less/footer.less');

var React = require('react');

var Footer = React.createClass({
	render: function () {
		return (
			<div className="footer">
				<div className="footer-map" style={{display:'none'}}>
					<div className="container">
						<div className="row">
							<div className="col-md-4">
								<div className="footer-map-item">
								<h4 className="footer-map-item-title"> <span className="icon-maishouzhinan"/> 买手指南</h4>
									<ul className="footer-map-links">
										<li><a href="#">新手指引</a></li>
										<li><a href="#">一键上传</a></li>
										<li><a href="#">买手维权</a></li>
										<li><a href="#">疑问解答</a></li>
									</ul>
								</div>
							</div>
							<div className="col-md-4">
								<div className="footer-map-item">
									<h4 className="footer-map-item-title"><span className="icon-dangkouzhinan"/>档口指南</h4>
									<ul className="footer-map-links">
										<li><a href="#">档口入驻</a></li>
										<li><a href="#">档口认证</a></li>
										<li><a href="#">商品更新</a></li>
										<li><a href="#">疑问解答</a></li>
									</ul>
								</div>
							</div>
							<div className="col-md-4">
								<div className="footer-map-item">
									<h4 className="footer-map-item-title"><span className="icon-zhifufangshi"/>支付方式</h4>
									<ul className="footer-map-links">
										<li><a href="#">在线支付</a></li>
										<li><a href="#">快捷支付</a></li>
									</ul>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div className="footer-links">
					<a href="#" className="footer-link">关于我们</a>
					<a href="#" className="footer-link">联系我们</a>
					<a href="#" className="footer-link" style={{display:'none'}}>商家入驻</a>
					<p className="footer-copy">&copy; 2016 广州柯咔网络科技有限公司</p>
				</div>
			</div>
			);
	}
});

module.exports = Footer;