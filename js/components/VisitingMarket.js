require('../../less/visitingmarket.less');
require('slick-carousel/slick/slick.less');
var React = require('react');
var Slick = require('react-slick');
var CkSearch = require('./CkSearch.js');
var CkHr = require('./CkHr.js');
var Pagination = require('./Pagination.js');
var VisitingMarketUtil = require('../utils/VisitingMarketUtil.js');

var qs = require('qs');
var _ = require('lodash');

var VisitingMarketSlickBox = React.createClass({
	render:function(){
		var settings = {
			dots: true,
			arrows: true,
			infinite: true,
			autoplay: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: <button><span className="icon-xiangqian"/></button>,
			nextArrow: <button><span className="icon-xianghou"/></button>,
			dotsClass: 'visitingmarket-carousel-dots'
		}
		return (
			<div className="visitingmarket-carousel">
				<Slick {...settings}>
					<div className="visitingmarket-carousel-item">
						<a href="#">
							<img src="http://placehold.it/1140x314" />
						</a>
					</div>
					<div className="visitingmarket-carousel-item">
						<a href="#">
							<img src="http://placehold.it/1140x314" />
						</a>
					</div>
					<div className="visitingmarket-carousel-item">
						<a href="#">
							<img src="http://placehold.it/1140x314" />
						</a>
					</div>
				</Slick>
			</div>
		);
	}
});
var MarketCategoryBox = React.createClass({
	getInitialState:function(){
		return{
			market: '全部',
			floor: '全部',
			category: '',
			
		}
	},
	render:function(){

		// switch(this.props.query.marketId + this.props.query.floor)

		var marketItems = this.props.markets.map(function(item,index){
			var newQuery = {
				marketId: '',
				floor: '',
				category: ''
			};
			if (this.props.query) {
				newQuery = _.assign({}, this.props.query, { marketId: item.marketId });
			}
			else {
				newQuery.marketId = item.marketId
			}

			return (
				<li className="visitingmarket-cotegorybox-list-item" key={index}>
					<a href={window.location.pathname + '?' + qs.stringify(newQuery)}> {item.market} </a>
				</li>
			);
		}, this);

		var floorItems = this.props.floors && this.props.floors.map(function(item, index){
			var newQuery = {
				marketId: '',
				floor: '',
				category: ''
			};
			if (this.props.query) {
				newQuery = _.assign({},this.props.query, {floor:item});
			}
			else {
				newQuery.floor = item.floor
			}

			return (
				<li className="visitingmarket-cotegorybox-list-item" key={index}>
					<a href={window.location.pathname + '?' + qs.stringify(newQuery)}>{item}</a>
				</li>
			);
		}, this);

		var categoryItems = this.props.category.map(function(item, index){
			var newQuery = {
				marketId: '',
				floor: '',
				category: ''
			};

			if (this.props.query) {
				newQuery = _.assign({},this.props.query, {category:item.category});
			}
			else {
				newQuery.category = item.category
			}

			return (
				<li className="visitingmarket-cotegorybox-list-item" key={index}>
					<a href={window.location.pathname + '?' + qs.stringify(newQuery)}>{item.category}</a>
				</li>
			);
		}, this);

		var marketName = '全部';
		if (this.props.query) {
			this.props.markets.every(function(item) {
				if (item.marketId + '' === this.props.query.marketId) {
					marketName = item.market;
					return false
				}
				return true;
			}, this);
		}

			
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="visitingmarket-cotegorybox">
						<div className="col-md-2 text-center">
							市场
						</div>
						<div className="col-md-10">
							<ul className="visitingmarket-cotegorybox-list clearfix">
								<li className="visitingmarket-cotegorybox-list-item"><a href="#">全部</a></li>
								{marketItems}
							</ul>
						</div>
						<div className="col-md-2 text-center">
							楼层
						</div>
						<div className="col-md-10">
							<ul className="visitingmarket-cotegorybox-list clearfix">
								<li className="visitingmarket-cotegorybox-list-item"><a href="#">全部</a></li>
								{floorItems}
							</ul>
						</div>
						<div className="col-md-2 text-center">
							主营
						</div>
						<div className="col-md-10">
							<ul className="visitingmarket-cotegorybox-list clearfixl">
								{categoryItems}
							</ul>
						</div>
						<div className="visitingmarket-marketbc">
						{
							this.props.query ?

							<ol className="breadcrumb">
								{	
									this.props.query.marketId ? 
									<li><a href="#">{marketName}</a></li> : null
								}
								{
									this.props.query.floor ? 
							  		<li><a href="#">{this.props.query.floor}</a></li>  : null
								}
							 	{
							 		this.props.query.category ? 
							  		<li><a href="#">{this.props.query.category}</a></li>  : null
							 	}
							</ol>
							:
							<ol className="breadcrumb">
								<li><a href="#">全部</a></li>
								<li><a href="#">全部</a></li>
								<li><a href="#">全部</a></li>
							</ol>
						}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var MarketListBox = React.createClass({
	
	render:function(){
		var marketListItem = this.props.searchStores.map(function(item, index){
			return (
				<li className="visitingmarket-listbox-fistpart-list-item" key={index}>
					<div className="content">
						<div className="content-title">
							{item.store}
						</div>
						<div className="content-other">
							<div className="content-other-avatar">
								<img src={item.logoUrl} />
							</div>
							<span className="content-other-textone">{item.market}</span>
							<span className="content-other-texttwo">主营：{item.category}</span>
							<span className="content-other-textthree">{item.floor} {item.stalls}</span>
							<a className="content-other-link" href="">进店逛逛</a>
						</div>
					</div>
				</li>
			);
		},this);

		return (
			<div className="visitingmarket-listbox">
				<div className="visitingmarket-listbox-fistpart">
					<ul className="visitingmarket-listbox-fistpart-list clearfix">
						{marketListItem}
					</ul>
				</div>
				<Pagination pageNum={this.props.pageNum} hasPrevious={this.props.hasPrevious} navigatepageNums={this.props.navigatepageNums} hasNextPage={this.props.hasNextPage} totalPages={this.props.totalPages} changePage={this.changePage}/>
			</div>
		);
	},
	changePage: function(pageNum) {
		var obj = {};
		obj.page = pageNum-1;
		this.props.changePage(obj);
	}
	
});

var SearchBox = React.createClass({
	render:function(){
		return (
			<div className="row">
				<div className="visitingmarket-searchbox">

					<div className="col-md-2">
					</div>
					<div className="col-md-8">
							<h4>没有找到合适的商品？您可以搜索：</h4>
							<CkSearch/>
					</div>
					<div className="col-md-2">
					</div>
				</div>
			</div>
		);
	}
});

var PopularRecommendedBox = React.createClass({
	getInitialState:function(){
		return {
			list:[]
		}
	},
	componentDidMount:function(){
		var gp = {
			groupId:3,
			pageSize:10
		}
		VisitingMarketUtil.getPopularRecommendedInfo(gp,function(res){
			this.setState({
				list:res.list
			});
		}.bind(this));
	},
	render:function(){
		var prlistItems = this.state.list.map(function(item, index){
			return (
				<li className="list-item" key={index}>
					<div className="list-item-img"><img src={item.productimage}/></div>
					<span className="list-item-price">¥{item.lowerPrice}</span>
					<span className="list-item-title">{item.title}</span>
					<span className="list-item-lspan">{item.store}</span>
					<span className="list-item-rspan">{item.position}</span>
				</li>
			);
		});
		return (
			<div className="visitingmarket-rebox">
				<div className="visitingmarket-rebox-toptwo">
					<span className="hotspan">HOT</span>
					<span className="titlespan">人气推荐</span>
					<hr className="ck-hr"/>
				</div>
				<div className="visitingmarket-rebox-links">
					<ul className="list">
						{prlistItems}
						{/*<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>*/}
						<li className="list-item">
							<div className="list-item-img"><img src="./images/test_avatar.png" /></div>
							<span className="list-item-price">¥5000</span>
							<span className="list-item-title">泓清战地爆款牛仔卫裤2016春秋装新款</span>
							<span className="list-item-lspan">宝丽美服饰</span>
							<span className="list-item-rspan">大西豪823档</span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

var VisitingMarket = React.createClass({
	getInitialState: function() {
		var p = 0;
		if (this.props.location.query && this.props.location.query.page) {
			p = this.props.location.query.page;
		}
		return {
			markets: [],
			floors:[],
			category:[],
			searchStores: [],
			hasNextPage: false,
			hasPrevious: false,
			totalPages: 0,
			navigatepageNums:[],
			pageNum:p
		};
	},

	componentDidMount: function() {
		var q = {};
		if (this.props.location.query) {
			q = _.assign({}, this.props.location.query, {page: this.state.pageNum});
		}
		else {
			q = {
				page: this.state.pageNum
			}
		}

		VisitingMarketUtil.getMarketCotegoryInfo(q, function(res){
			this.setState({
				markets: res.markets,
				floors:res.floors,
				category:res.category,
				searchStores: res.searchStores,
				hasPrevious:res.hasPrevious,
				hasNextPage:res.hasNextPage,
				totalPages:res.totalPages,
				navigatepageNums:res.navigatepageNums,
				pageNum:res.pageNum
			});
		}.bind(this));
	},

	render:function(){
		return (
			<div className="visitingmarket">
				<div className="visitingmarket-topone">
					<span className="visitingmarket-topone-icon">
						<img src="/images/mingxingdianpu.svg" width="30" />
					</span>
					<span className="visitingmarket-topone-title">明星店铺</span>
					<hr className="ck-hr" />
				</div>
				<VisitingMarketSlickBox/>
				<MarketCategoryBox markets={this.state.markets} floors={this.state.floors} category={this.state.category} query={this.props.location.query}/>
				<MarketListBox {...this.state} query={this.props.location.query}/>
				<CkHr/>
				<SearchBox/>
				<PopularRecommendedBox/>
			</div>
		);
	}
});
module.exports = VisitingMarket;