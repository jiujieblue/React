require('../../less/seller-public.less');
var React = require('react');
var SellerSide = require('./SellerSide.js');
var SellerPublicUtil = require('../utils/SellerPublicUtil.js');
var SellerPublic = React.createClass({
	getInitialState:function(){
		return{
			type:1,
			shopList:[],
			marketList:[]
		}
	},
	componentDidMount:function(){
		var me = this;
		SellerPublicUtil.shopPublic(function(res){
			me.setState({
				shopList:res.list
			})
		})
	},
	_type:function(t){
		var me = this;
		me.setState({
			type:t
		})
		SellerPublicUtil.marketPublic(function(res){
			me.setState({
				marketList:res.list
			})
		})
	},
	render: function () {
		var me = this;
		var itemsShop = me.state.shopList.map(function(item,index){
			return(
				<div className="msg-list" key={index}>
					<div className="msg-list-tit">
						<h4>{item.title}</h4>
						<p>{item.content}</p>
					</div>
					<div className="msg-list-time">
						<p>{item.createTimeString.split(' ')[0]}</p>
						<p><a>详情></a></p>
					</div>
				</div>
			)
		})
		var itemsMarket = me.state.marketList.map(function(item,index){
			return(
				<div className="msg-list" key={index}>
					<div className="msg-list-tit">
						<h4>{item.title}</h4>
						<p>{item.content}</p>
					</div>
					<div className="msg-list-time">
						<p>{item.timeString}</p>
						<p><a>详情></a></p>
					</div>
				</div>
			)
		})
		return (
			<div className="row">
				<div className="col-md-2">
					<SellerSide />
				</div>
				<div className="col-md-10">
					<div className="seller-public">
						<div className="seller-public-location">
							当前位置：其他 > 公告
						</div>
						<div className="seller-public-msgbox">
							<ul className="public-menu">
								<li onClick={this._type.bind(this,1)} className={this.state.type == 1 ? 'active' : ''}>商城公告</li>
								<li onClick={this._type.bind(this,2)} className={this.state.type == 2 ? 'active' : ''}>市场通知</li>
							</ul>
							<div className="public-msg" style={{display:this.state.type == 1 ? 'block' : 'none'}}>
								<div className="public-msg-kong" style={{display:this.state.shopList[0] ? 'none' : 'block'}}>
									<span className="icon-tongzhi"></span>
									<p>暂无消息</p>
								</div>
								<div className="public-msg-content" style={{display:this.state.shopList[0] ? 'block' : 'none'}}>
									{itemsShop}
								</div>
							</div>

							<div className="public-msg" style={{display:this.state.type == 2 ? 'block' : 'none'}}>
								<div className="public-msg-kong" style={{display:this.state.marketList[0] ? 'none' : 'block'}}>
									<span className="icon-tongzhi"></span>
									<p>暂无消息</p>
								</div>
								<div className="public-msg-content" style={{display:this.state.marketList[0] ? 'block' : 'none'}}>
									{itemsMarket}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = SellerPublic;