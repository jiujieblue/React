require('../../less/wallet-withdrawal-details.less');
var React = require('react');
var BuyerSide = require('./BuyerSide.js');
var WalletWithdrawalDetailsUtil=require('../utils/WalletWithdrawalDetailsUtil.js');
var WalletWithdrawalDetailsBox = React.createClass({
	getInitialState:function(){
		return {
			detailsData:''
		};
	},
	componentDidMount:function(){
		var me = this;
		var href=location.href;
		var hrefIndex=href.indexOf('?')+1;
		href=href.slice(hrefIndex);
		WalletWithdrawalDetailsUtil.getDetailsData(href,function(res){
			console.log(res);
			me.setState({
				detailsData:res
			});
		});
	},
	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<div className="wallet-withdrawal-details">
						<BuyerSide />
					</div>
				</div>
				<div className="col-md-10">
					<div className="wallet-withdrawal-details-box">
						<p><span>当前位置：我的钱包 > </span>提现结果</p>
						<p>提现记录</p>
						<WalletWithdrawalDetailsSuccess detailsData={this.state.detailsData}/>
					</div>
				</div>
			</div>
		);
	}
});

var WalletWithdrawalDetailsSuccess = React.createClass({
	render:function(){
		var applyTime=this.props.detailsData.applyTime;
		var dealTime=this.props.detailsData.dealTime;
		function TimeYMD(time){
			var Y=(new Date(time)).getFullYear();
			var M=((new Date(time)).getMonth()+1)<10?('0'+((new Date(time)).getMonth()+1)):(new Date(time)).getMonth()+1;
			var D=(new Date(time)).getDate()<10?('0'+((new Date(time)).getDate()+1)):(new Date(time)).getDate()+1;
			return(Y+'-'+M+'-'+D)
		}
		function TimeHM(time){
			var D=((new Date(time)).getHours())<10?('0'+((new Date(time)).getHours()+1)):(new Date(time)).getHours()+1;
			var M=((new Date(time)).getMinutes())<10?('0'+((new Date(time)).getMinutes()+1)):(new Date(time)).getMinutes()+1;
			return(D+' : '+M)
		}
		return (
			<div className="wallet-withdrawal-details-box-success">
				<div>
					<link className={this.props.detailsData.status==1?'icon-but-processing':this.props.detailsData.status==2?'icon-success':'icon-shibai'} />
					{this.props.detailsData.status==1?'处理中':this.props.detailsData.status==2?'提现成功':'提现失败'}
				</div>
				<ul>
					<li>
						<span>申请时间：</span>{TimeYMD(applyTime)}&nbsp;&nbsp;&nbsp;&nbsp;{TimeHM(applyTime)}
					</li>
					<li>
						<span>提 现 到：</span>***************{this.props.detailsData.cardNum}&nbsp;&nbsp;{this.props.detailsData.issuer}
					</li>
					<li>
						<span>持 卡 人：</span>{this.props.detailsData.cardholder}
					</li>
					<li style={{display:this.props.detailsData.status==1?'block':'none'}}>
						<span>到账时间：</span>预计1-3天
					</li>
					<li style={{display:this.props.detailsData.status==2?'block':'none'}}>
						<span>到账时间：</span>{TimeYMD(dealTime)}&nbsp;&nbsp;&nbsp;&nbsp;{TimeHM(dealTime)}
					</li>
					<li style={{display:this.props.detailsData.status==3?'block':'none'}}>
						<span>失败原因：</span>
						<ul>
							<li>1、您绑定的银行卡是否正确填写卡号、姓名及开卡行；</li>
							<li>2、确定您的银行卡是否处于正常使用状态；</li>
							<li>3、如有疑问，请联系柯咔客服平台。</li>
						</ul>
					</li>
				</ul>
				<p><a href="javascript:history.go(-1)" target='_self'>返回</a></p>
			</div>
		);
	}
});
module.exports = WalletWithdrawalDetailsBox;