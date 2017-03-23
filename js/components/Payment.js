require('../../less/payment.less');
var React = require('react');
var PaymentUtil = require('../utils/PaymentUtil.js');
var fto=require('form_to_object');
var Payment = React.createClass({
	getInitialState:function(){
		return{
			step:'choosepay',
			trans:'',
			showShopping:false,
			othPay:false,
			loginType:0,
			data:'',
			addr:'',
			payInfo:{},
			balance:'',
			paymentId:'',
			kekaUse:false,
		}
	},
	componentDidMount:function(){
		var q=this.props.location.query;
		PaymentUtil.getData(q,function(res){
			this.setState({
				data:res,
				addr:res.address,
				balance:res.balance,
				payInfo:res.payInfo,
				kekaUse:res.balance > res.totalPrice,
			})
		}.bind(this))
	},
	_onload:function(){
		window.location.reload();
	},
	_showShopping:function(){
		var me=this;
		if(me.state.showShopping){
			me.setState({
				showShopping:false
			})

		}
		else{
			me.setState({
				showShopping:true,
			})
		}
	},
	_othpay:function(t){
		var me=this;
		if(t==1){
			me.setState({
				othPay:true,
			})
		}
		else if(t==2){
			me.setState({
				othPay:true,
				trans:t,
				paymentId:me.state.data.onlinePayments[3].paymentId
			})
		}
		else if(t==3){
			me.setState({
				othPay:true,
				trans:t,
				paymentId:me.state.data.onlinePayments[2].paymentId
			})
		}
		else if(t==4){
			me.setState({
				othPay:true,
				trans:t,
				paymentId:me.state.data.onlinePayments[1].paymentId
			})
		}
		else{
			me.setState({
				othPay:false,
				trans:0,
				paymentId:me.state.data.onlinePayments[0].paymentId	
			})
		}
	},
	_nextStep:function(e){
		e.preventDefault();
		var me = this;
		var data = fto(e.target);
		if((data.chooseList && me.state.othPay) || (data.choosePayType && !me.state.othPay)){
			me.setState({
				step:'nowPay',
				loginType:me.state.trans,
			})
		}
		
		// PaymentUtil.payment({paymentId:me.state.paymentId},function(){
			
		// })
	},
	_loginType:function(e){
		var me=this;
		var target=e.target.getAttribute('dir');
		if(target == 'kekaqianbao'){
			me.setState({
				loginType:0
			})
		}
		else if(target == 'saomalogin'){
			me.setState({
				loginType:1
			})
		}
		else if(target == 'pczhifu' || target == 'zhangmilogin'){
			me.setState({
				loginType:2
			})
		}
		else if(target == 'zhifubaosaoma'){
			me.setState({
				loginType:3
			})
		}
		else{
			me.setState({
				loginType:4
			})
		}
		
	},
	render: function () {
		var itemsArr = [];
		for(var p in this.state.payInfo){
			itemsArr.push(this.state.payInfo[p]);
		}
		var itemsTable = itemsArr.map(function(item,index){
			return(
				<tr key={index}>
					<td>{item.storeName}</td>
					<td>{item.orderSerialNum}</td>
					<td>{item.title}</td>
					<td>{item.number}</td>
					<td>{item.orderPrice}</td>
				</tr>
			)
		})
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="payment">
						<div className="payment-alert">
							<h4>
								订单提交成功，请您尽快付款!
							</h4>
							<p><span>!</span>请您在<span>24小时</span>内完成支付，否则订单会自动取消。</p>	
						</div>

						<div className="payment-detailsh">
							<div>
							<div style={{textAlign:this.state.step == 'choosepay' ? 'left' : 'right'}}>应付金额：<span>¥ {this.state.data.totalPrice}</span>元<span style={{display:this.state.step == 'choosepay' ? 'inline-block' : 'none'}}>(若有变动，请<a onClick={this._onload}>刷新</a>)</span></div>
								<div><button onClick={this._showShopping}>订单详情</button></div>
								<div><span className={this.state.showShopping ? "icon-fanyeup" : "icon-fanyedown"}></span></div>
							</div>
						</div>

						<div className={this.state.showShopping ? "payment-detailbox showShopping" : 'payment-detailbox'}>
							<div>
								<span className="glyphicon glyphicon-map-marker"></span>收货地址：{this.state.addr.state}{this.state.addr.city}{this.state.addr.region}{this.state.addr.detail} {this.state.addr.zipCode}(邮编) {this.state.addr.name}(收) {this.state.addr.phone}
							</div>
							<table>
								<thead>
									<tr>
										<td>店铺名称</td>
										<td>订单</td>
										<td>商品名称</td>
										<td>数量</td>
										<td>订单金额</td>
									</tr>
								</thead>
								
								<tbody>
									{itemsTable}
								</tbody>
								<tfoot>
									<tr>
										<td>
											返现金额
										</td>
										<td>
											20.00元
										</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tfoot>
							</table>
						</div>

						<div className="payment-loginbox">
							<div className="payment-loginbox-choosepay" style={{display:this.state.step == 'choosepay' ? 'block' : 'none'}}>
								<form onSubmit={this._nextStep}>
									<input id="keka" name="choosePayType" type="radio" onChange={this._othpay.bind(this,0)} disabled={!this.state.kekaUse}/>
									<label htmlFor="keka">柯咔钱包(余额：{this.state.balance}元)</label>
									<button type="button" style={{display: this.state.kekaUse ? 'none' : 'inline-block'}}>充值</button>
									<br/>
									<input id="othPay" name="choosePayType" type="radio" onChange={this._othpay.bind(this,1)}/>
									<label htmlFor="othPay">其他支付方式</label>
									<div style={{display:this.state.othPay ? 'block' : 'none'}}>
										<h4>第三方支付</h4><span></span>	
										<div className="saoma">
											<div>在线支付平台</div>
											<div className="pczhifubox">
												<input id="zhifubao" type="radio" name="chooseList" onChange={this._othpay.bind(this,2)}/>
												<label htmlFor="zhifubao" className="pczhifu"></label>
											</div>
											
											<div>手机扫码</div>
											<div className="saomabox">
												<div>
													<input id="zhifubaosaoma" type="radio" name="chooseList" onChange={this._othpay.bind(this,3)}/>
													<label htmlFor="zhifubaosaoma" className="zhifubaosaoma">
														<span className="icon-kuaijiezhifu"></span>
													</label>
												</div>
												
												<div>
													<input id="weixinsaoma" type="radio" name="chooseList" onChange={this._othpay.bind(this,4)}/>
													<label htmlFor="weixinsaoma" className="weixinsaoma">
														<span className="icon-weixinzhifu"></span>
														<span>微信支付</span>
														<span className="icon-kuaijiezhifu"></span>
													</label>
												</div>
											</div>	
										</div>
									</div>
									<div>
										<button type="submit">下一步</button>
									</div>
								</form>		
							</div>

							

							<div className="payment-loginbox-form">
								<div className="payment-loginbox-form-paypwd" style={{display: (this.state.step == 'nowPay' && this.state.loginType == 0) ? 'block' : 'none'}}>
									<div>
										<img src="images/icons/qiandai.png"/>柯咔钱包&nbsp;&nbsp;&nbsp;可用零钱:<span>{this.state.balance}</span>元
									</div>

									<form>
										<input type="text" placeholder="请输入支付密码"/>
										<a>忘记密码?</a>
										<button>立即支付</button>
									</form>
								</div>

								<div className="payment-loginbox-form-login" style={{display:(this.state.loginType == 1 || this.state.loginType == 2) ? 'block' : 'none'}}>
									<div className={this.state.loginType == 1 ? 'active' : ''}>
										<a dir="list1" onClick={this._loginType} dir="saomalogin">扫码登录</a>
									</div>
									<div className={this.state.loginType == 2 ? 'active' : ''}>
										<a dir="list2" onClick={this._loginType} dir="zhangmilogin">帐密登录</a>
									</div>	
								</div>

								<div className={this.state.loginType ==1 ? 'showLogin' : ''}>
									<h4>扫码登录</h4>
									<img src="images/detail-look.jpg"/>
								</div>

								<form className={this.state.loginType==2 ? 'showLogin' : ''}>
									<div>
										<span className="icon-zhanghao"></span>
										<input type="text" name="phoneNum" placeholder="请输入您的手机号码"/>
									</div>
									<div>
										<span className="icon-mima"></span>
										<input type="text" name="pwd" placeholder="请输入密码"/>
									</div>
									<a className="losemima">
										忘记登录密码？
									</a>
									<button type="submit" className="btn btn-primary btn-block btn-lg">登录</button>
									<div>
										<a>淘宝会员登录</a>
										<a>免费注册</a>
									</div>
								</form>
								
								<div className={this.state.loginType ==3 ? 'showLogin' : ''}>
									<h4>支付宝</h4>
									<img src="images/detail-look.jpg"/>
								</div>

								<div className={this.state.loginType ==4 ? 'showLogin' : ''}>
									<h4>微信支付</h4>
									<img src="images/detail-look.jpg"/>
								</div>
							</div>

							<div className="payment-loginbox-oth" style={{display:this.state.step == 'choosepay' ? 'none' : 'block'}}>
								<div className="paytypebox">
									<span>其他付款方式：</span>
									<label className="pczhifu" style={{display:this.state.loginType == 0 ? 'block' : 'none'}} onClick={this._loginType} dir="pczhifu"></label>
									<label className="kekaqianbao" style={{display:this.state.loginType == 0 ? 'none' : 'block'}} onClick={this._loginType} dir="kekaqianbao">
										<span className="icon-yuezhifu" dir="kekaqianbao"></span>
										<span dir="kekaqianbao">柯咔钱包</span>
									</label>
								</div>

								<div style={{display:this.state.loginType <= 2 ? 'block' : 'none'}}>
									<div className="paytypebox">
										<span>手机扫码：</span>
										<label className="zhifubaosaoma" onClick={this._loginType} dir="zhifubaosaoma">
											<span className="icon-kuaijiezhifu" dir="zhifubaosaoma"></span>
										</label>
										<label className="weixinsaoma" onClick={this._loginType} dir="weixinsaoma">
											<span className="icon-weixinzhifu" dir="weixinsaoma"></span>
											<span dir="weixinsaoma">微信支付</span>
											<span className="icon-kuaijiezhifu" dir="weixinsaoma"></span>
										</label>
									</div>																
								</div>

								<div style={{display:this.state.loginType >2 ? 'block' : 'none'}}>
									<div className="paytypebox">
										<span>在线支付：</span>
										<label className="pczhifu" onClick={this._loginType} dir="pczhifu"></label>
									</div>
									
									<div className="paytypebox">
										<span>手机扫码：</span>
										<label className="weixinsaoma" style={{display:this.state.loginType == 3 ? 'block' : 'none'}} onClick={this._loginType} dir="weixinsaoma">
											<span className="icon-weixinzhifu" dir="weixinsaoma"></span>
											<span dir="weixinsaoma">微信支付</span>
											<span className="icon-kuaijiezhifu" dir="weixinsaoma"></span>
										</label>	
										<label className="zhifubaosaoma" style={{display:this.state.loginType == 3 ? 'none' : 'block'}} onClick={this._loginType} dir="zhifubaosaoma">
											<span className="icon-kuaijiezhifu" dir="zhifubaosaoma"></span>
										</label>
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

module.exports = Payment;