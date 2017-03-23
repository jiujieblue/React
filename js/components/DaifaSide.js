require('../../less/daifa-side.less');
var React = require('react');
var DaifaSide = React.createClass({
	getInitialState:function(){
		return{
			menuN:''
		}
	},
	render: function () {
		var me=this;
		window.onload=function(){
			$('.daifa-side>ul>li').click(function(e){
				e.stopPropagation();
				$('.daifa-side>ul>li').css({
					'background':'',
					'color': ''
				});
				$('.daifa-side>ul>li span').css('display','none');
				$(this).css({
					'background':'#e7e7e7',
					'color': '#000'
				});
				$(this).children().css('display','inline-block');
				me.setState({
					menuN:e.target.textContent
				})
				console.log(me.state.menuN)
			})

		}
		return (
			<div className="daifa-side">
				<p>交易中心</p>
				<ul>
					<li><p>我的订单</p><span className="icon-xianghou"></span></li>
					<li><p>我的对账单</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>我的钱包</p>
				<ul>	
					<li><p>钱包余额</p><span className="icon-xianghou"></span></li>
					<li><p>交易明细</p><span className="icon-xianghou"></span></li>
					<li><p>提现</p><span className="icon-xianghou"></span></li>
					<li><p>设置支付密码</p><span className="icon-xianghou"></span></li>
					<li><p>银行卡管理</p><span className="icon-xianghou"></span></li>
				</ul>
			</div>
		);
	}
});

module.exports = DaifaSide;