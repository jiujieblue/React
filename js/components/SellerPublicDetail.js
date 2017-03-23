require('../../less/seller-public-detail.less');
var React = require('react');
var SellerSide = require('./SellerSide.js');
var SellerPublicDetailUtil = require('../utils/SellerPublicDetailUtil.js');
var SellerPublicDetail = React.createClass({
	getInitialState:function(){
		return{
			title:'',
			time:'',
			content:''
		}
	},
	componentDidMount:function(){
		var me = this;
		SellerPublicDetailUtil.getData({messageId:1},function(res){
			me.setState({
				title:res.title,
				time:res.createTimeString,
				content:res.messageUrl
			})
		})
	},
	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<SellerSide />
				</div>
				<div className="col-md-10">
					<div className="seller-public-detail">
						<div className="seller-public-detail-location">
							当前位置：其他 > 公告信息
						</div>
						<div className="seller-public-detail-tit">							
							<div>
								<h4>{this.state.title}</h4>
							</div>
						</div>
						<div className="seller-public-detail-time">
							<p>{this.state.time}</p>
							<p>商城公告</p>
						</div>
						<div dangerouslySetInnerHTML={{__html: this.state.content}} />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = SellerPublicDetail;