require('../../less/seller-deal-detail.less');
var React = require('react');
var _ = require('lodash');
var fto  = require('form_to_object');
var SellerSide = require('./SellerSide.js');
var SellerDealDetailUtil = require('../utils/SellerDealDetailUtil.js');
var ErrorMsg = require('./ErrorMsg.js');
var CKPagination = require('./CKPagination.js');
var SellerDealDetail = React.createClass({
	getInitialState:function(){
		return{
			error: '',
			res:{},
			logs:[],
			timeStart:null,
			timeEnd:null,
			paymentSerialNum:'',
			phone:'',
			money:'',
			type:'',
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
		SellerDealDetailUtil.getData(function(res){
			this.setState({
				res:res,
				logs:res.logs,
				hasNextPage: res.hasNextPage,
				pageNum: res.pageNum
			})
		}.bind(this))
	},
	_changeDate1: function(e) {
		var nState = _.assign({}, this.state);
		nState[e.target.name] = e.target.value;
		this.setState(nState);
	},
	_changeDate2: function(e) {
		var nState = _.assign({}, this.state);
		nState[e.target.name] = e.target.value;
		this.setState(nState);
	},
	
	_changeVal:function(t,e){
		var me = this;
		me.setState({
			error:''
		})
		if(t==1){
			if(/^\d{0,17}$/.test(e.target.value)){
				me.setState({
					paymentSerialNum:e.target.value
				})
			}
			else{
				me.setState({
					error:'请输入正确的单号'
				})
			}
		}
		else if(t==2){
			me.setState({
				phone:e.target.value
			})
			
		}
		else if(t==3){
			if(/^\d{0,12}$/.test(e.target.value)){
				me.setState({
					money:e.target.value
				})
			}else{
				me.setState({
					error:'请输入正确的金额'
				})
			}
		}
		else{
			me.setState({
				type:e.target.value
			})
		}
	},
	_submit:function(e){
		var me = this;
		e.preventDefault();
		var data = fto(e.target);
		if(data.timeStart || data.timeEnd || data.paymentSerialNum || data.phone || data.money || Boolean(Number(data.type))){
			SellerDealDetailUtil.search(data,function(res){
				me.setState({
					logs:res.logs
				})
			})
		}
		
	},
	render: function () {
		$(document).ready(function(){
			$('.react-datepicker__input-container input').attr('placeholder','请选择日期')
		})
		var me = this;
		var itemsData = me.state.logs.map(function(item,index){
			return(
				<tr key={index}>
					<td>{index+1}</td>
					<td>{item.timeStr}</td>
					<td>{item.transTitle}</td>
					<td>{item.paymentSerialNum}</td>
					<td>{item.phone}</td>
					<td>{item.realTransMoney}</td>
					<td>{item.isIncome ? '收入' : '支出'}</td>
					<td>{item.paymentMethod}</td>
				</tr>
			)
			
		})
		return (
			<div className="row">
				<div className="col-md-2">
					<SellerSide/>
				</div>
				<div className="col-md-10">
					<div className="seller-deal-detail">
						<div className="seller-deal-detail-location">
							当前位置：我的钱包 > 交易明细
						</div>
						<form className="seller-deal-detail-menu" onSubmit={this._submit}>
							<div className="menu-time">
								<span>时间范围</span>
								<input type="date" name="timeStart" value={this.state.timeStart || ''} onChange={this._changeDate1}/><span className="em"></span>--<span className="em"></span><input type="date" name="timeEnd" value={this.state.timeEnd || ''} onChange={this._changeDate2}/>
							</div>
							<div className="menu-order">
								<span>订单编号</span>
								<input name="paymentSerialNum" onChange={this._changeVal.bind(this,1)} value={this.state.paymentSerialNum || ''}/>
							</div>
							<div className="menu-jiaoyi">
								<span>交易用户</span>
								<input name="phone" onChange={this._changeVal.bind(this,2)} value={this.state.phone || ''}/>
							</div>
							<div className="menu-jine">
								<span>订单金额</span>
								<input onChange={this._changeVal.bind(this,3)} value={this.state.money || ''}/>
							</div>
							<div className="menu-leixing">
								<span>交易类型</span>
								<select name="type" onChange={this._changeVal.bind(this,4)} value={this.state.type || ''}>
									<option value=''>全部</option>
									<option value={10}>快捷支付</option>
									<option value={13}>商城订单</option>
								</select>
							</div>
							<button type="submit">查找</button>
							<div className="totaljine" style={{display:'none'}}>
								2016-05-05至2016-06-06  交易总金额 : <span>5050.00</span>元
							</div>
						</form>
						<ErrorMsg error={this.state.error} />
						<div className="seller-deal-detail-name">
							<table>
								<thead>
									<tr>
										<td>序号</td>
										<td>交易时间</td>
										<td>交易类型</td>
										<td>订单编号</td>
										<td>交易用户</td>
										<td>订单金额</td>
										<td>收入/支出</td>
										<td>支付方式</td>
									</tr>
								</thead>
								<tbody>
									{itemsData}								
								</tbody>
							</table>
						</div>
						<div>
							<CKPagination {...this.state} query={this.props.location.query} />
						</div>
						
						
					</div>
				</div>
			</div>
			);
	}
});

module.exports = SellerDealDetail;