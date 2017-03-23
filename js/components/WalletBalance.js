require('../../less/wallet-balance.less');
var React = require('react');
var BuyerSide = require('./BuyerSide.js');
var DatePicker1 = require('react-datepicker');
var DatePicker2 = require('react-datepicker');
var moment = require('moment');
var WalletBalanceUtil = require('../utils/WalletBalanceUtil.js');
var CKPagination=require('./CKPagination.js');
require('react-datepicker/dist/react-datepicker.css');
var WalletBalanceBox = React.createClass({
	getInitialState:function(){
		return {
			tradingData:'',
			tradingList:[],
			hasNextPage: false,
			hasPreviousPage: false,
			navigatepageNums: [],
			nextPage: 0,
			pageNum: 1,
			pages: 0,
			prePage: 0
		};
	},
	componentDidMount:function(){
		var me = this;
		WalletBalanceUtil.getBalanceData(function(res){
			me.setState({
				tradingData: res,
				paymentOrders:res.paymentOrders,
				tradingList: res.paymentOrders.list,
				hasNextPage: res.paymentOrders.hasNextPage,
				hasPreviousPage: res.paymentOrders.hasPreviousPage,
				navigatepageNums: res.paymentOrders.navigatepageNums,
				nextPage: res.paymentOrders.nextPage,
				pageNum: res.paymentOrders.pageNum,
				pages: res.paymentOrders.pages,
				prePage: res.paymentOrders.prePage
			});
		});
	},
	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<div>
						<BuyerSide />
					</div>
				</div>
				<div className="col-md-10">
					<div className="wallet-balance">
						<div>
							<p><span>当前位置：我的钱包 > </span>钱包余额</p>
							<WalletBalanceUserInfo tradingData={this.state.tradingData}/>
						</div>
						<WalletBalanceTradingDetail tradingList={this.state.tradingList}/>
					</div>
					<CKPagination {...this.state} query={this.props.location.query} />
					<p className="wallet-balance-page">
						第<span>{this.state.paymentOrders&&this.state.paymentOrders.pageNum}</span>页&nbsp;&nbsp;&nbsp;
						共&nbsp;{this.state.paymentOrders&&this.state.paymentOrders.pages}&nbsp;页&nbsp;&nbsp;
						{this.state.paymentOrders&&this.state.paymentOrders.total}条记录
					</p>
				</div>
			</div>
		);
	}
});
// 用户信息
var WalletBalanceUserInfo = React.createClass({
	render:function(){
		return (
			<div className='wallet-balance-userinfo'>
				<section>
					<section>
						<img src='/images/user.gif' title='头像'/>{this.props.tradingData.name||'游客'}
					</section>
					<ul>
						<li>
							<link className='icon-shimingyanzheng'/><span>未实名验证</span>
							<link className={this.props.tradingData.isPayPassSet&&'wallet-balance-userinfo-isPass '+'icon-zhifumima'}/>
							<span>未设置支付密码</span>
							<link className='icon-bangdingshouji wallet-balance-userinfo-isPass'/><span>已绑定手机</span>
						</li>
					</ul>
				</section>
				<section>
					<ul>
						<li>
							<span>我的余额：</span>
							<b>{this.props.tradingData.balance||'0.00'}&nbsp;&nbsp;元</b>
							<a href='http://localhost/cooka-finance-web/withdrawHistory'>提现记录</a>
						</li>
						<li>
							<a href='http://localhost/cooka-store-web/withdrawPage'>提现</a>
							<a href=''>去付款</a>
						</li>
					</ul>
				</section>
				<section>
					<ul>
						<li><link className='icon-xianjingquan'/>现金券<span>0</span>张</li>
						<li><link className='icon-youhuiquan'/>店铺优惠券<span>0</span>张</li>
						<li><link className='icon-yinghangka'/>银行卡<span>{this.props.tradingData.cardNumbers||'0'}</span>张</li>
					</ul>
				</section>
			</div>
		);
	}
});

// 交易明细组件
var WalletBalanceTradingDetail = React.createClass({
	getInitialState:function(){
		return {
			timeStart: this._setData(new Date(),0),
			timeEnd: this._setData(new Date(),0),
			orderWarning: '',
			isSubmit: true
		}
	},
	_setData:function(time,n){
		var y=time.getFullYear();
		var m=(time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
		var d=time.getDate()<10?('0'+time.getDate()):time.getDate();
		time = new Date(y,m-1+parseInt(n),d);
		y=time.getFullYear();
		m=(time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
		d=time.getDate()<10?('0'+time.getDate()):time.getDate();
		return y+'-'+m+'-'+d;
	},
	
	handleChooseDateChange:function(e){
		var val=e.target.value;
		if(val=='all'||val=='0'){
			this.setState({
				timeStart:'',
				timeEnd:''
			});
		}else{
			this.setState({
				timeEnd:this._setData(new Date(),val)
			});
		}
	},
	
	handleOrderBlur:function(e){
		var rep = /\s*/g;
		var	reg = /^\d{18}$/g;
		var val = e.target.value.replace(rep,"");
		if(!reg.test(val)&&val){
			e.target.style.borderColor='red';
			this.setState({
				orderWarning:'请输入正确订单号！',
				isSubmit:false
			});
		}else{
			e.target.style.borderColor='#ccc';
			this.setState({
				orderWarning:'',
				isSubmit:true
			});
		}
	},
	_submit:function(e){
		e.preventDefault();
		var submitForm=new FormData(this.refs.form);
		var timeStart=new Date(this.state.timeStart).toLocaleDateString();
		var timeEnd=new Date(this.state.timeEnd).toLocaleDateString();
		submitForm.append('timeStart',timeStart);
		submitForm.append('timeEnd',timeEnd);
		if(this.state.isSubmit){
			WalletBalanceUtil.submitData(submitForm,function(res){
				console.log(res);
			});
		}
	},
	handleChange: function(t,e) {
		if(t==1){
			if(new Date(e.target.value).getTime()<new Date(this.refs.timeEnd.value).getTime()||!this.state.timeEnd){
				this.setState({
					timeStart:this._setData(new Date(e.target.value),0)
				});
			}
		}
		if(t==2){
			if(new Date(e.target.value).getTime()>new Date(this.refs.timeStart.value).getTime()||!this.state.timeStart){
				this.setState({
					timeEnd:this._setData(new Date(e.target.value),0)
				});
			}
		}
	},

	render:function(){
		return (
			/* 交易明细 */
			<div className='wallet-balance-detail'>
				<div>
					<p>交易明细</p>
					<form onSubmit={this._submit} ref='form'>
						<table>
							<thead>
								<tr>
									<td>
										时间范围：
										<input type='date' value={this.state.timeStart} ref='timeStart' onChange={this.handleChange.bind(this,1)}/>
										--
										<input type='date' value={this.state.timeEnd} ref='timeEnd' onChange={this.handleChange.bind(this,2)}/>
									</td>
									<td>
										订单号：<input type="text" name='withdrawSerialnum'  onBlur={this.handleOrderBlur}/>
										<p>{this.state.orderWarning}</p>
									</td>
									<td><button>搜索</button></td>
									<td><button>导出</button></td>
									<td>
										<select onChange={this.handleChooseDateChange}>
											<option value='0'>选择时间</option>
											<option value='1'>最近一个月</option>
											<option value='3'>最近三个月</option>
											<option value='6'>最近半年</option>
											<option value='all'>全部</option>
										</select>
									</td>
								</tr>
							</thead>
						</table>
					</form>
				</div>
				{/* 交易明细--列表 */}
				<table>
					<thead>
						<tr>
							<th>时间</th>
							<th>订单</th>
							<th>类型</th>
							<th>订单金额</th>
							<th>收入/支出</th>
							<th>支付方式</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tradingList.map(function(item,index){
							return(
								<tr key={index}>
									<td>{item.timeStr}</td>
									<td>{item.paymentSerialNum}</td>
									<td>{item.typeTitle}</td>
									<td>{item.orderMoney}</td>
									<td>{item.money}</td>
									<td>{item.paymentMethod}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = WalletBalanceBox;