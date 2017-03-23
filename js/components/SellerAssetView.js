require('../../less/seller-asset-view.less');
var React = require('react');
var SellerSide = require('./SellerSide.js');
var SellerAssetViewUtil = require('../utils/SellerAssetViewUtil.js');
var SellerAssetView = React.createClass({
	getInitialState:function(){
		return{
			res:{},
			balance:{},
			data:[]
		}
	},
	componentDidMount:function(){
		SellerAssetViewUtil.getData(function(res){
			this.setState({
				res:res,
				balance:res.balance,
				data:res.balanceLog
			})
		}.bind(this));
	},
	render: function () {
		var me = this;
		var percentSC = me.state.res.totalPayment/(me.state.res.totalPayment + me.state.res.totalFastPayment);
		var itemsData = me.state.data.map(function(item,index){
			var time = item.timeStr.split(' ');
			return(
				<div className="detailbox-detail" key={index}>
					<div className="detailbox-detail-l">
						<h4>{time[0]}</h4>
						<span>{time[1]}</span>
					</div>
					<div className="detailbox-detail-l">
						<h4>{item.transTitle}</h4>
						<span>付款人 : {item.phone}</span>
					</div>
					<div className="detailbox-detail-l">
						&yen; {item.realTransMoney}
					</div>
				</div>
			)
		})
		$(document).ready(function(){
			var canvas = $('.mycanvas')[0];
			var ctx = canvas.getContext('2d');
			ctx.fillStyle='#ff450c';
			ctx.beginPath();
			ctx.arc(100,100,60,-Math.PI/2,-Math.PI/2+percentSC*2*Math.PI);
			ctx.lineWidth='35';
			ctx.strokeStyle = '#50c4fc';
			ctx.stroke();
			ctx.closePath();
			ctx.beginPath();
			ctx.arc(100,100,60,-Math.PI/2+percentSC*2*Math.PI,-Math.PI/2);
			ctx.lineWidth='35';
			ctx.strokeStyle = '#fcc505';
			ctx.stroke();
			ctx.closePath();
		}) 
		return (
			<div className="row">
				<div className="col-md-2">
					<SellerSide/>
				</div>
				<div className="col-md-10">
					<div className="seller-asset-view">
						<div className="seller-asset-view-location">
							当前位置：我的钱包 > 资产概览
						</div>
						<div className="seller-asset-view-graph">
							<div className="graph-canvas-l">
								<canvas className="mycanvas" width='200' height='200'>

								</canvas>
							</div>
							<div className="graph-canvas-m">
								<h4>总资产</h4>
								<div>&yen; {this.state.balance.balance}</div>
							</div>
							<div className="graph-canvas-r">
								<div>
									<div></div>
									<p>商城订单交易</p>
									<span>&yen; {this.state.res.totalPayment}</span>
								</div>
								<div>
									<div></div>
									<p>快捷支付交易</p>
									<span>&yen; {this.state.res.totalFastPayment}</span>
								</div>
							</div>
						</div>
						<div className="seller-asset-view-detailbox">
							<div className="detailbox-title">
								最近交易
							</div>
							{itemsData}
						</div>
					</div>

				</div>
			</div>
			);
	}
});

module.exports = SellerAssetView;