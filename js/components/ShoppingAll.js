require('../../less/shopping-all.less');
var React = require('react');
var ShoppingAllUtil=require('../utils/ShoppingAllUtil.js');
var CKPagination=require('./CKPagination.js');
var qs = require('qs');
var _ = require('lodash');

var ShoppingAll = React.createClass({

	getInitialState:function(){
		return {
			data:'',
			goodsLise:[],
			categories:'',
			sub:[],
			list: [],
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
		ShoppingAllUtil.getData('/cooka-store-web/allStoreProducts?storeId=2',function(res){
			me.setState({
				data: res.pageinfo,
				goodsLise:res.pageinfo.list,
				categories:res.categories[0],
				sub:res.categories[0].sub,
				list: [],
				hasNextPage: res.pageinfo.hasNextPage,
				hasPreviousPage: res.pageinfo.hasPreviousPage,
				navigatepageNums: res.pageinfo.navigatepageNums,
				nextPage: res.pageinfo.nextPage,
				pageNum: res.pageinfo.pageNum,
				pages: res.pageinfo.pages,
				prePage: res.pageinfo.prePage
			});
		}.bind(this));	},

	handleSumMouseOver:function(e){
		var ele='';
		var b = e.target.parentNode.children;
		for(var i=0;i<b.length;i++){
			if(b[i]!== e.target){
				ele= b[i]; 
			}
		}
		e.target.className="active";
		ele.className="";
	},
	isShow:true,
	handleMouseOver:function(){
		this.refs.ShoppingClass.className="show";
		this.refs.ShoppingClass.style.maxHeight=getComputedStyle(this.refs.ShoppingClassUl).height;
		this.isShow=false;
	},
	handleMouseOut:function(){
		this.refs.ShoppingClass.className="";
		this.refs.ShoppingClass.style.maxHeight='72px';
		this.isShow=true;
	},
	render: function () {
		return (
			<div className="row" ref="nimei">
				<div className="col-md-12 shopping-all">
					<ul className="shopping-all-nav">
						<li className="active" onMouseOver={this.handleSumMouseOver}>
							全部商品
						</li>
						<li onMouseOver={this.handleSumMouseOver}>
							会员专区
						</li>
					</ul>
					<div  className="shopping-all-goodssum">
						<p>商品分类<span>共{this.state.data.total}件相关商品</span></p>
						<div ref="ShoppingClass">
							<span>{this.state.categories.name}：</span>
							<ul ref='ShoppingClassUl' id='ul'>
								{this.state.sub.map(function(item,index){
									return (
										<li key={index}><a href="">{item.name}</a></li>
									);
								})}
							</ul>
							<span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>更多</span>
							<i ref="ShoppingSan" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></i>
						</div>
					</div>
					<div  className="shopping-all-sales">
						<ul>
							<li>销量</li>
							<li>上新时间<i></i></li>
							<li>价格</li>
						</ul>
						<ul>
							<li><input type="text" placeholder="最低价"/></li>
							<li>-</li>
							<li><input type="text" placeholder="最高价"/></li>
						</ul>
					</div>
					<div className="shopping-all-details">
						<div className="shopping-all-details-class">
							<ul>
								{this.state.goodsLise.map(function(item,index){
									return (
										<li key={index}>
											<a href=""><img src={item.imageUrl}/></a>
											<div>
												<p>
													<b>￥{item.price}.00</b>
													<span className="icon-shoucang"></span>
												</p>
												<p>{item.title}</p>
												<p><span>#{item.productId}</span><input type="submit" value="一键上传"/></p>
											</div>
										</li>
									);
								})}
							</ul>
						</div>

						<div className="shopping-all-details-recom">
							<ul>
								<li>
									<span>HOT</span>
									推荐商品
								</li>
								<li>
									<a href=""><img src="images/detail-side.jpg"/></a>
								</li>
								<li>
									<a href=""><img src="images/detail-side.jpg"/></a>
								</li>
								<li>
									<a href=""><img src="images/detail-side.jpg"/></a>
								</li>
								<li>
									<a href=""><img src="images/detail-side.jpg"/></a>
								</li>
							</ul>
						</div>
					</div>
					<div className="shopping-all-page">
						<CKPagination {...this.state} query={this.props.location.query} />
					</div>
				</div>
			</div>
		);

	}
});

module.exports = ShoppingAll;