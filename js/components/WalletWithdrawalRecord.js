require('../../less/wallet-withdrawal-record.less');
var React = require('react');
var BuyerSide = require('./BuyerSide.js');
var CKPagination=require('./CKPagination.js');
var WalletWithdrawalRecordUtil=require('../utils/WalletWithdrawalRecordUtil.js');
var WalletWithdrawalRecordBox = React.createClass({
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
		}
	},

	componentDidMount:function(){
		var me=this;
		WalletWithdrawalRecordUtil.getRecordData(function(res){
			me.setState({
				tradingData:res,
				history:res.history,
				tradingList:res.history.list,
				hasNextPage: res.history.hasNextPage,
				hasPreviousPage: res.history.hasPreviousPage,
				navigatepageNums: res.history.navigatepageNums,
				nextPage: res.history.nextPage,
				pageNum: res.history.pageNum,
				pages: res.history.pages,
				prePage: res.history.prePage
			});
		});
	},

	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<div className="wallet-withdrawal-record">
						<BuyerSide />
					</div>
				</div>
				<div className="col-md-10">
					<div className="wallet-withdrawal-record-box">
						<p>当前位置：我的钱包 > <span>提现记录</span></p>
						<p>提现记录</p>
						<WalletWithdrawalRecordDetail tradingData={this.state.tradingData}/>
						<WalletWithdrawalRecordList tradingList={this.state.tradingList}/>
					</div>
					<CKPagination {...this.state} query={this.props.location.query} />
					<p className="wallet-withdrawal-record-page">
						第<span>{this.state.history&&this.state.history.pageNum}</span>页&nbsp;&nbsp;&nbsp;
						共&nbsp;{this.state.history&&this.state.history.pages}&nbsp;页&nbsp;&nbsp;
						{this.state.history&&this.state.history.total}条记录
					</p>
				</div>
			</div>
		);
	}
});

var WalletWithdrawalRecordDetail = React.createClass({
	getInitialState:function(){
		return {
			timeStart:this._setData(new Date(),0),
			timeEnd:this._setData(new Date(),0)
		};
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
	_submit:function(e){
		e.preventDefault();
		var submitData=new FormData(this.refs.form);
		var timeStart=new Date(this.state.timeStart).toLocaleDateString();
		var timeEnd=new Date(this.state.timeEnd).toLocaleDateString();
		submitData.append('timeStart',timeStart);
		submitData.append('timeEnd',timeEnd);
		if(this.state.isSubmit){
			WalletWithdrawalRecordUtil.subWithdrawSerialnum(submitData,function(res){
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

	handleDateChange:function(e){
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
	render:function(){
		return(
			<div className="wallet-withdrawal-record-box-detail">
				<ul>
					<li>可提现余额：<span>{this.props.tradingData.balance||'0.00'}</span>元</li>
					<li>已提现余额：<span>{this.props.tradingData.totalWithdraw||'0.00'}</span>元</li>
				</ul>
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
									<select onChange={this.handleDateChange}>
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
		);
	}
});

var WalletWithdrawalRecordList = React.createClass({
	render:function(){
		return(
			<div className="wallet-withdrawal-record-box-list">
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>提现时间</th>
							<th>提现金额</th>
							<th>提现银行</th>
							<th style={{display:'none'}}>到账时间</th>
							<th>提现状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tradingList&&this.props.tradingList.map(function(item,index){
							return(<tr key={index}>
								<td>{index+1}</td>
								<td>{item.time}</td>
								<td>{item.money}</td>
								<td>{item.issuer}</td>
								<td style={{display:'none'}}>{item.time}</td>
								<td style={{color:item.status==1?'#50c5fe':item.status==3?'red':'#fcc505'}}>{item.status==1?'处理中':item.status==2?'提现成功':'提现失败'}</td>
								<td><a href={'http://localhost/cooka-finance-web/withdrawDetailPage?'+item.withdrawSerialnum} data-withdrawSerialnum={item.withdrawSerialnum}>查看详情</a></td>
							</tr>)
						})}
					</tbody>
				</table>
			</div>
		);
	}
});
module.exports = WalletWithdrawalRecordBox;