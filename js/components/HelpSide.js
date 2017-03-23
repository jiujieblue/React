require('../../less/help-side.less');
var React = require('react');
var HelpSide = React.createClass({
	getInitialState:function(){
		return{
			menuN:''
		}
	},
	render: function () {
		var me=this;
		window.onload=function(){
			$('.help-side>ul>li').click(function(e){
				e.stopPropagation();
				$('.help-side>ul>li').css({
					'background':'',
					'color': ''
				});
				$('.help-side>ul>li span').css('display','none');
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
			<div className="help-side">
				<p>快捷支付</p>
				<ul>
					<li><p>子标题1</p><span className="icon-xianghou"></span></li>
					<li><p>子标题2</p><span className="icon-xianghou"></span></li>
					<li><p>子标题3</p><span className="icon-xianghou"></span></li>
					<li><p>子标题4</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>账号安全</p>
				<ul>	
					<li><p>密码管理</p><span className="icon-xianghou"></span></li>
					<li><p>登录账号</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>实名认证</p>
				<ul>
					<li><p>实名认证介绍</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>钱包余额</p>
				<ul>	
					<li><p>标题1</p><span className="icon-xianghou"></span></li>
					<li><p>标题2</p><span className="icon-xianghou"></span></li>
					<li><p>标题3</p><span className="icon-xianghou"></span></li>
				</ul>
				<p>买家帮助</p>
				<ul>
					<li><p>买家帮助</p><span className="icon-xianghou"></span></li>
					<li><p>银行卡管理</p><span className="icon-xianghou"></span></li>
				</ul>
			</div>
		);
	}
});

module.exports = HelpSide;