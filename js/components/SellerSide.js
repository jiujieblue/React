require('../../less/seller-side.less');
var React = require('react');


var SellerSide = React.createClass({
	getInitialState:function(){
		return{
			menuN:''
		}
	},
	render: function () {
		var me=this;
		window.onload=function(){
			$('.seller-side>ul>li').click(function(e){
				e.stopPropagation();
				$('.seller-side>ul>li').css({
					'background':'',
					'color': ''
				});
				$('.seller-side>ul>li span').css('display','none');
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
			<div className="seller-side">
				<p>我是商家</p>
				<ul className="shoppingup-menu-shop">
					<li><p>商家资料</p><span className="icon-xianghou"></span></li>
					<li><p>商家认证</p><span className="icon-xianghou"></span></li>
					<li><p>子账户管理</p><span className="icon-xianghou"></span></li>
					<li><p>账户安全</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>商品管理</p>
				<ul className="shoppingup-menu-manage">	
					<li><p>一键同步</p><span className="icon-xianghou"></span></li>
					<li><p>商品上传</p><span className="icon-xianghou"></span></li>
					<li><p>草稿箱</p><span className="icon-xianghou"></span></li>
					<li><p>在售/停售商品</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>物流管理</p>
				<ul className="shoppingup-menu-trans">
					<li><p>运费模块设置</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>交易中心</p>
				<ul className="shoppingup-menu-jiaoyi">	
					<li><p>我的订单</p><span className="icon-xianghou"></span></li>
					<li><p>快捷支付单</p><span className="icon-xianghou"></span></li>
					<li><p>会员管理</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>我的钱包</p>
				<ul className="shoppingup-menu-purse">
					<li><p>资产概览</p><span className="icon-xianghou"></span></li>
					<li><p>交易明细</p><span className="icon-xianghou"></span></li>
					<li><p>提现</p><span className="icon-xianghou"></span></li>
					<li><p>银行卡设置</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>其他</p>
				<ul className="shoppingup-menu-oth">
					<li><p>公告信息</p><span className="icon-xianghou"></span></li>
					<li><p>帮助中心</p><span className="icon-xianghou"></span></li>
				</ul>
			</div>
		);
	}
});

module.exports = SellerSide;