require('../../less/pay-footer.less');
var React = require('react');
var PayFooter = React.createClass({
	render: function () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="pay-footer">
						<div className="pay-footer-links">
							<a href="#" className="pay-footer-link">关于我们</a>
							<a href="#" className="pay-footer-link">联系我们</a>
							<a href="#" className="pay-footer-link" style={{display:'none'}}>商家入驻</a>
							<p className="pay-footer-copy">&copy; 2016 广州柯咔网络科技有限公司</p>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = PayFooter;