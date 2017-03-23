require('../../less/paysuccess.less');
var React = require('react');
var Paysuccess = React.createClass({
	render: function () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="paysuccess">
						<div className="paysuccess-alert">
							<h4>
								<span className="icon-xuanze"></span>您已成功付款!
							</h4>
							<p>订单正在处理中，货物会快马加鞭送到您手中</p>	
						</div>

						<div className="paysuccess-paydetail">
							<div>付款金额：<span>￥5700.00</span>元</div>
							<div>付款时间：2016-7-14 13:25</div>
							<div>付款方式：支付宝</div>
							<div>
								<button>返回商城</button>
								<button>查看订单</button>
							</div>
						</div>

						<div className="paysuccess-order">
							<div className="paysuccess-order-peisong">
								<div>商家配送订单</div>
								<div>订<span className="em_5"/>单<span className="em_5"/>号：0123456789123456</div>
								<div>店<span className="em"/><span className="em"/>铺：嘟嘟服饰</div>
								<div>收货地址：广东省广州市沙河区新朝都-1F-107 联系电话：12345612345</div>
							</div>

							<div className="paysuccess-order-peisong">
								<div>代发订单</div>
								<div>订<span className="em_5"/>单<span className="em_5"/>号：0123456789123456</div>
								<div>店<span className="em"/><span className="em"/>铺：嘟嘟服饰</div>
								<div>收货地址：广东省广州市沙河区新朝都-1F-107 联系电话：12345612345</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = Paysuccess;