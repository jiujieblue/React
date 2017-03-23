require('../../less/daifa-withdrawal-results.less');
var React = require('react');
var Daifaside = require('./Daifaside.js');
var DaifaWithdrawalResults = React.createClass({
	getInitialState:function(){
		return {
			detailsData:''
		};
	},
	// componentDidMount:function(){
	// 	var me = this;
	// 	var href=location.href;
	// 	var hrefIndex=href.indexOf('?')+1;
	// 	href=href.slice(hrefIndex);
	// 	WalletWithdrawalDetailsUtil.getDetailsData(href,function(res){
	// 		me.setState({
	// 			detailsData:res
	// 		});
	// 	});
	// },
	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<Daifaside />
				</div>
				<div className="col-md-10">
					<div className='daifa-withdrawal-results'>
						<p><span>当前位置：我的钱包 > </span>提现</p>
						<div>
							<div>
								<link className='icon-success'/>
								提交提现申请成功
							</div>
							<ul>
								<li>
									您已成功提交提现申请，
								</li>
								<li>
									提现金额将在1-3个工作日打款到您指定的银行中，
								</li>
								<li>
									请注意查收，谢谢！
								</li>
							</ul>
							<p><a href="javascript:history.go(-1)" target='_self'>返回</a></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = DaifaWithdrawalResults;