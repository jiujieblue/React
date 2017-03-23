require('../../less/daifa-balance.less');
var React = require('react');
var DaifaSide = require('./DaifaSide.js');
var DaifaBalance = React.createClass({
	getInitialState:function(){
		return{
			hasCard:false,
		}
	},
	render: function () {
		var card={
			'中国银行':'bankCard_zg.png',
			'招商银行':'bankCard_zs.png',
			'中信银行':'bankCard_zx.png',
			'广东农信':'bankCard_gdnx.png',
			'广州农商银行':'bankCard_gzns.png',
			'中国建设':'bankCard_js.png',
			'平安银行':'bankCard_pa.png'
		};
		return (
			<div className="row">
				<div className="col-md-2">
					<DaifaSide />
				</div>
				<div className="col-md-10">
					<div className="daifa-balance">
						<div className="daifa-balance-location">
							当前位置：我的钱包 > 钱包余额
						</div>
						<div className="daifa-balance-self">
							<div className="balance-self-l">
								<img src="./images/detail-color.jpg" />
								<div className="self-l-r">
									<div>
										<h4>代发猫</h4>
										<p><span className="icon-certification"></span>未实名认证</p>
									</div>
									<div>
										<p>我的余额 :</p>
										<span>&yen; 1000.00</span>
									</div>
									<div>
										<button>提<span className="em"></span>现</button>
										<a>提现记录</a>
									</div>
								</div>
							</div>
							<div className="balance-self-r">
								<p>银行卡</p>
								<div className="self-r-card" style={{display:this.state.hasCard ? 'block' : 'none'}}>
									<div>
										<img src="./images/bankCard_js.png"/>
										<p>存储卡</p>
									</div>
									<div>
										**** **** **** 4001
									</div>
									<div>
										<a>删除此卡</a>
									</div>
								</div>
								<div className="self-r-card-no" style={{display:this.state.hasCard ? 'none' : 'block'}}>
									<span>+</span>
									<p>添加银行卡</p>
								</div>
							</div>
						</div>
						<div className="daifa-balance-recent">
							<span className="icon-total"></span>最近结算
						</div>
						<div className="daifa-balance-detail">
							<table>
								<tbody>
									<tr>
										<td>
											2016-02-01 12:00:00
										</td>
										<td>
											<p>平台结算</p>
											<p>付款人:柯咔钱包</p>
										</td>
										<td>
											250.00
										</td>
									</tr>
									<tr>
										<td>
											2016-02-01 12:00:00
										</td>
										<td>
											<p>平台结算</p>
											<p>付款人:柯咔钱包</p>
										</td>
										<td>
											250.00
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						
					</div>
				</div>
			</div>
			);
	}
});

module.exports = DaifaBalance;