require('../../less/user-center.less');
var React = require('react');
var UserCenterUtil=require('../utils/UserCenterUtil.js');
var BuyerSide = require('./BuyerSide.js');
var UserCenter = React.createClass({
	getInitialState:function(){
		return {
			userData:'',
			balance:0,
			newAnnouncement:[],
			browseData:'',
			browseList:[],
			concernData:'',
			concernList:[],
			goodsCollectionData:'',
			goodsCollectionList:[],
			myOrder:'',
			myOrderList:[]
		}
	},
	componentWillMount:function(){
		var me=this;
		//用户信息
		UserCenterUtil.getData('/cooka-user-web/center/getUserCenterProfile',function(res){
			me.setState({
				userData:res,
				balance:res.balance.balance
			});
		});
		//公告
		UserCenterUtil.getData('/cooka-user-web/latestAnnouncements',function(res){
			me.setState({
				newAnnouncement:res
			});
		});
		//最近浏览
		UserCenterUtil.getData('/cooka-product-web/latestProductTrace',function(res){
			me.setState({
				browseData:res,
				browseList:res.list
			});
		});
		//我的店铺收藏
		UserCenterUtil.getData('/cooka-user-web/center/myConcernContent',function(res){
			me.setState({
				concernData:res,
				concernList:res.list
			});
		});
		//商品收藏
		UserCenterUtil.getData('/cooka-user-web/center/viewFavourite',function(res){
			me.setState({
				goodsCollectionList:res
			});
		});
		//我的订单
		UserCenterUtil.getData('/cooka-order-web/buyerOrderList',function(res){
			me.setState({
				myOrder:res,
				myOrderList:res.orders.list
			});
		});
	},
	_display:function(jj){
		return jj.length==0?'block':'none';
	},
	render: function () {
		var phoneDisplay='',emailDisplay='',pwdDisplay='';
		this.state.userData.isPhoneSet?phoneDisplay='icon-shouji2':phoneDisplay='icon-shouji1';
		this.state.userData.isEmailSet?emailDisplay='icon-youxiang2':emailDisplay='icon-youxiang1';
		this.state.userData.isPasswordSet?pwdDisplay='icon-mima2':pwdDisplay='icon-mima1';
		
		return (
			<div className="row">
				<div className="col-md-2">
					<div>
						<BuyerSide />
					</div>
				</div>
				<div className="col-md-10 user-center">
					<div className="user-center-info">
						<div>
							<div ref="lili">
								<img src="/images/user.gif" title="上传头像"/>
							</div>
							<ul>
								<li><span style={{color:!this.state.name&&'red'}}>{this.state.name||"游客"}</span>({this.state.userData.account})</li>
								<li>
									<ul>
										<li>
											<span className={phoneDisplay}><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
											<b>手机{this.state.userData.isPhoneSet?"已":"未"}设置</b>
										</li>
										<li>
											<span className={emailDisplay}><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
											<b>邮箱{this.state.userData.isEmailSet?"已":"未"}设置</b>
										</li>
										<li>
											<span className={pwdDisplay}><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
											<b>支付密码{this.state.userData.isPasswordSet?"已":"未"}设置</b>
										</li>
									</ul>
								</li>
								<li>
									余额（元）：<b>￥{this.state.balance||'0.00'}</b>优惠券：共计<b>{this.state.userData.couponCount||'0.00'}</b>张
								</li>
							</ul>
							<p>上次登录：<span>{this.state.userData.lastLoginTime||'-- : --'}</span></p>
						</div>
						<div>
							<p>
								<span>NEW</span>最新公告：<a href="" className="icon-more"></a>
							</p>
							<ul style={{borderColor:this.state.newAnnouncement.length==0?'#ccc':'#fcc505'}}>
								<li className="newAnnouncement" style={{display:this._display(this.state.newAnnouncement)}}>
									<img src='/images/dingdan.png'/>
									<span>暂无公告消息！</span>
								</li>
								{this.state.newAnnouncement.map(function(item,index){
									return(
										<li key={index} id={item.messageId} title={item.title}>
											<i></i>
											<a href={item.messageUrl}>{item.content}</a>
											<span>{(new Date(item.createTime)).getFullYear()}-{(new Date(item.createTime)).getMonth()+1}-{(new Date(item.createTime)).getDate()}</span>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className="user-center-myOrder">
						<ul>
							<li><span className="icon-wodedingdan"></span>我的订单</li>
							<li className="myOrder-nav">代付款（0）</li>
							<li className="myOrder-nav">待发货（0）</li>
							<li className="myOrder-nav">待确认收货（0）</li>
							<li className="myOrder-nav">待评价（0）</li>
							<li><a href="">查看更多></a></li>
						</ul>
						<div className="user-center-myOrder-number">
							<ul ref="myOrderUL">
								<li className="myOrderLi" style={{display:this._display(this.state.myOrderList)}}>
									<img src='/images/dingdan.png'/>
									<span>暂无相关订单记录！</span>
								</li>
								{this.state.myOrderList.map(function(item,index){
									if(index<4){
										return(
											<li key={index}>
												<p><span>订单号</span>{item.orderSerialnum}</p>
												<ul>
													<li>
														<a href=""><img src={item.orderProducts[0].imageUrl}/></a>
														<ul>
															<li><b>￥{item.priceBefore}</b>含运费（￥{item.shippingCost}）</li>
															<li>共{item.orderProducts[0].orderItems.length}款；合计{item.totalAmount}件</li>
														</ul>
													</li>
													<li>
														<ul>
															<li>{item.status==1?'您已下单,待完成付款。':item.status==2?'您已完成付款，待发货。':item.status==3?'您的订单已发货，待收货。':item.status==4?'交易成功！':'订单已取消！'}</li>
															<li>{item.createTimeString}<a href="">查看详情</a></li>
														</ul>
													</li>
													<li>
														<button type="submit">马上付款</button>
													</li>
												</ul>	
											</li>
										)
									}
								})}
							</ul>
						</div>
					</div>
					<div className="user-center-public">
						<p><span className="icon-shoucang"></span>商品收藏<a href="">查看所有商品收藏({this.state.goodsCollectionList.length})></a></p>
						<ul className="publicUl" ref="goodsCollectionUL">
							<li className="publicLi" style={{display:this._display(this.state.goodsCollectionList)}}>
								<img src='/images/shoucang.png'/>
								<span>您还没有收藏喜欢的商品<br/>快去商场逛逛吧~</span>
							</li>
							{this.state.goodsCollectionList.map(function(item,index){
								if(index<6){
									return(
										<li key={index} data-userId={item.userId}>
											<a href="" data-productId={item.productId}><img src={item.imageUrl}/></a>
											<span>￥{item.price}</span>
										</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="user-center-public">
						<p><span className="icon-guanzhudianjia"></span>店铺关注<a href="">近期上新店铺({this.state.concernData.total})></a></p>
						<ul className="publicUl" ref="concernUL">
							<li className="publicLi" style={{display:this._display(this.state.concernList)}}>
								<img src='/images/dianpu.png'/>
								<span>您还没有关注过店铺<br/>快去逛逛吧~</span>
							</li>
							{this.state.concernList.map(function(item,index){
								if(index<6){
									return(
										<li key={index} id={item.storeId}>
											<a href="">
												<b>SHOP</b>
												<img src={item.storeLogo}/>
												<span>上新255件</span>
											</a>
											<span>{item.storeName}</span>
										</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="user-center-public user-center-recently">
						<p><span className="icon-liulan"></span>最近浏览<a href="">查看我的足迹({this.state.browseData.total})></a></p>
						<ul ref="browseUL">
							<li className="browseLi" style={{display:this._display(this.state.browseList)}}>
								<img src='/images/liulang.png'/>
								<span>您还没有浏览过商品<br/>快去逛逛吧~</span>
							</li>
							{this.state.browseList.map(function(item,index){
								if(index<6){
									return(
										<li key={index}>
											<a data-productId={item.productId} href="">
												<img src={item.imageUrl}/>
											</a>
											<div>
												<p>
													{item.title}
												</p>
												<span>￥{item.price}</span>
											</div>
										</li>
									);
								}
							})}
						</ul>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = UserCenter;