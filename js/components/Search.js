require('../../less/search.less');
var Pagination = require('../components/Pagination.js');
var qs = require('qs');
var React = require('react');
var SearchUtil = require('../utils/SearchUtil.js');

var fto = require('form_to_object');
var _ = require('lodash');

var SearchConditions = React.createClass({
	getInitialState: function(){
		return{
			categoriesMore: false,
			fqMore: false,
			fqCheckbox: false
		};
	},
	render: function(){
		var data = this.props.data;
		var categoriesMore = this.state.categoriesMore;
		var stylesMore = this.state.stylesMore;
		var stylesCheckbox = this.state.stylesCheckbox;
		//类目
		var categories = [];
		if (data.searchCategory) {
			categories = data.searchCategory.categoryId.map(function(item,index){
				return (
					<li className="search-condition-item-subs-li" key={index} title={item.category} onClick={this.setQuery.bind(this,'categorySearch',item.categoryId)}>
						{item.category}
					</li>
				);
			}.bind(this));
		}
		//风格
		var styles = [];
		if (data.styles) {
			styles = data.styles.map(function(item,index){
				return (
					<li className="search-condition-item-subs-li" key={index} title={item.category} onClick={this.setQuery.bind(this,'fq',item.attrId)}>
					{stylesCheckbox?<label><input type="checkbox" className="search-condition-item-subs-li-checkbox" name="fq" value={item.attrId}/> {item.attrName}</label>:item.attrName} 
					</li>
				);
			}.bind(this));
		}
		return (
			<table className="search-condition">
				<tbody>
					{categories.length>0?<tr className="search-condition-item">
						<td className="search-condition-item-name">
							分类
						</td>
						<td className={(categoriesMore||categories.length<=10)?"search-condition-item-subs open":"search-condition-item-subs"}>
							<div className="search-condition-item-subs-left">
								<ul className="search-condition-item-subs-ul list-unstyled clearfix">
									{categories}
								</ul>
							</div>
							{categories.length>10?
							<span className="search-condition-item-subs-more" onClick={this.setMore.bind(this,'categories')}>
								| &nbsp;&nbsp;{categoriesMore?"收起":"更多"}
							</span>:null}
						</td>
					</tr>:null}
					{styles.length>0?<tr className="search-condition-item">
						<td className="search-condition-item-name">
							风格
						</td>
						<td className={(stylesMore||styles.length<=10)?"search-condition-item-subs open":"search-condition-item-subs"}>
							<form className="search-condition-item-subs-left" onSubmit={this.handleSubmit}>
								<ul className="search-condition-item-subs-ul list-unstyled clearfix">
									{styles}
								</ul>
								{stylesCheckbox?
								<div className="search-condition-item-subs-btns" >
									<button type="submit" className="btn btn-primary">
										确定
									</button>
									<button type="button" className="btn btn-default" onClick={this.setMore.bind(this,'styles')}>
										取消
									</button>
								</div>:null}
							</form>
							{styles.length>10?
								<span className="search-condition-item-subs-more" onClick={this.setMore.bind(this,'styles')}>
									| &nbsp;&nbsp;{stylesMore?"收起":"更多"}
								</span>:null}
							{stylesCheckbox?null:<span className="search-condition-item-subs-checkbox" onClick={this.setCheckbox.bind(this,'styles')}>
								多选
							</span>}
							
						</td>
					</tr>:null}
				</tbody>
			</table>
		);
	},
	setCheckbox: function(typeItem) {
		this.setState({
			[typeItem+'Checkbox']:true,
			[typeItem+'More']:true
		});
	},
	setMore: function(typeItem) {
		if (typeItem==='categories') {
			if (this.state[typeItem+'More']) {
				this.setState({
					[typeItem+'More']:false
				});
			}
			else {
				this.setState({
					[typeItem+'More']:true
				});
			}
		}
		else {
			if (this.state[typeItem+'More']) {
				this.setState({
					[typeItem+'Checkbox']:false,
					[typeItem+'More']:false
				});
			}
			else {
				this.setState({
					[typeItem+'Checkbox']:false,
					[typeItem+'More']:true
				});
			}
		}
	},
	handleSubmit: function(e){
		e.preventDefault();
		var data = fto(e.target);
		if (data) {
			this.props.changeQueryObject(data);
		}
	},
	setQuery: function(typeItem,valueId) {
		if (!this.state[typeItem+'Checkbox']) {
			var data = {};
			data[typeItem]=valueId;
			this.props.changeQueryObject(data);
		}
	}
});

var SearchBar = React.createClass({
	getInitialState: function(){
		return {
			startPrice: this.props.price.startPrice,
			endPrice: this.props.price.endPrice
		}
	},
	render: function() {
		var showType = this.props.showType;
		var sequence = this.props.sequence;
		var price = this.props.price;
		var startPrice = this.state.startPrice;
		var endPrice = this.state.endPrice;
		
		return (
			<div className="search-bar clearfix">
				<ul className="search-bar-sequence list-unstyled">
					<li className={(sequence===null||sequence==='default')?"search-bar-sequence-li active":"search-bar-sequence-li"} onClick={this.setSequence.bind(this,'default')}>
						综合排序
					</li>
					<li className={(sequence==='latest'||sequence==='early')?"search-bar-sequence-li active":"search-bar-sequence-li"} onClick={this.setSequence.bind(this,(sequence!=='latest'&&sequence!=='early')?'latest':(sequence==='latest'?'early':'latest'))}>
						上架时间 {sequence==='early'?<span className="icon-xianghou up"></span>:<span className="icon-xianghou"></span>}
					</li>

					<li style={{display:'none'}} className={sequence==='recommendProduct'?"search-bar-sequence-li active":"search-bar-sequence-li"} onClick={this.setSequence.bind(this,'recommendProduct')}>
					</li>
					<li style={{'display':'none'}} className={sequence==='recommendProduct'?"search-bar-sequence-li active":"search-bar-sequence-li"} onClick={this.setSequence.bind(this,'recommendProduct')}>

						销量 
					</li>
					<li className={(sequence==='priceUtd'||sequence==='priceDtu')?"search-bar-sequence-li active":"search-bar-sequence-li"} onClick={this.setSequence.bind(this,(sequence!=='priceUtd'&&sequence!=='priceDtu')?'priceDtu':(sequence==='priceDtu'?'priceUtd':'priceDtu'))}>
						价格 {sequence==='priceUtd'?<span className="icon-xianghou up"></span>:<span className="icon-xianghou"></span>}
					</li>
				</ul>
				<div className="search-bar-price">
					<ul className="search-bar-price-ul list-unstyled">
						<li className="search-bar-price-item">
							<input placeholder=" ￥" type="text" name="startPrice" ref="startPrice" value={startPrice} onChange={this.changeInput}/>
						</li>
						<li className="search-bar-price-seperate">
							~
						</li>
						<li className="search-bar-price-item">
							<input placeholder=" ￥" type="text" ref="endPrice" name="endPrice" value={endPrice} onChange={this.changeInput}/>
						</li>
						<li className="search-bar-price-btn">
							<button className="btn btn-default" onClick={this.setPriceRange}>
								确定
							</button>
						</li>
					</ul>
				</div>
				<span className="search-bar-icon">
					<span className={showType==="block"?"icon-pingpumoshi search-bar-icon-img active":"icon-pingpumoshi search-bar-icon-img"} onClick={this.setShowType.bind(this,'block')}>
					</span>
					<span className={showType==="list"?"icon-liebiao search-bar-icon-img active":"icon-liebiao search-bar-icon-img"} onClick={this.setShowType.bind(this,'list')}>
					</span>
				</span>
			</div>
		);
	},
	setShowType: function(type){
		if (type!==this.props.showType) {
			this.props.changeShowType(type);
		}
	},
	setPriceRange: function() {
		var pricePattern =/^\d+(\.\d{1,2})?$/;
		var startPrice = this.refs.startPrice.value.replace(/(^\s*)|(\s*$)/g,"");
		var endPrice = this.refs.endPrice.value.replace(/(^\s*)|(\s*$)/g,"");
		if (pricePattern.test(startPrice)&&pricePattern.test(endPrice)) {
			var startPriceFloat = parseFloat(startPrice);
			var endPriceFloat = parseFloat(endPrice);
			if (startPriceFloat<endPriceFloat) {
				this.props.changePriceRange(startPrice+'-'+endPrice);
			}
		}
	},
	setSequence: function(sequence) {
		var data = {};
		data.sequence = sequence;
		this.props.changeQueryObject(data);
	},
	changeInput: function(e){
		var name = e.target.name;
		var value = e.target.value;
		var oState = this.state;
		oState[name] = value;
		this.setState(oState);
	}
});

var SearchProducts = React.createClass({
	render: function() {
		var showType = this.props.showType;
		var searchProducts = this.props.searchProducts;
		var pageNum = this.props.pageNum;
		var hasNextPage = this.props.hasNextPage;
		var totalPages = this.props.totalPages;
		var hasPrevious = this.props.hasPrevious;
		var navigatepageNums = this.props.navigatepageNums;
		var products = [];
		if (showType==='block') {
			products = searchProducts.map(function(item,index){
				return (
						<div className="search-products-grid-item" key={index}>
						<a href={'/cooka-productDetail-web/productDetailPage?productId=' + item.productId} target="_blank">
							<img src={item.image} width="180" height="180"/>
						</a>
						<div className="search-products-grid-item-detail">
							<span className="search-products-grid-item-detail-price">
								￥{item.priceRange}
							</span>
							<a href={'/cooka-productDetail-web/productDetailPage?productId=' + item.productId} target="_blank" className="search-products-grid-item-detail-title">
								{item.title}
							</a>
							<span className="search-products-grid-item-detail-tip">
								<span>
									{item.store}
								</span>
								<span className="search-products-grid-item-detail-tip-rigth">
									{item.stalls}
								</span>
							</span>
						</div>
						{/*<div className="search-products-grid-item-hover">
							<div className="search-products-grid-item-hover-left">
							<a href={'/cooka-productDetail-web/productDetail?productId=' + item.productId} target="_blank"><img src={item.image} width="180" height="180"/></a>
								<div className="search-products-grid-item-hover-detail">
									<span className="search-products-grid-item-hover-detail-price">
										￥{item.priceRange}
									</span>
									<a href={'/cooka-productDetail-web/productDetail?productId=' + item.productId} target="_blank" className="search-products-grid-item-hover-detail-title">
										{item.title}
									</a>
									<span className="search-products-grid-item-hover-detail-tip">
										<span>
											宝立美服饰
										</span>
										<span className="search-products-grid-item-hover-detail-tip-rigth">
											大西豪 823档
										</span>
									</span>
								</div>
							</div>
							<div className="search-products-grid-item-hover-subs">
								<div className="search-products-grid-item-hover-subs-box">
									<img src="./images/prosearch.png" width="100%"/>
								</div>
								<div className="search-products-grid-item-hover-subs-box">
									<img src="./images/prosearch.png" width="100%"/>
								</div>
							</div>
						</div>*/}
					</div>
				);
			});
		}
		else {
			products = searchProducts.map(function(item,index){
				return (
					<div className="search-products-list-item" key={index}>
						<div className="search-products-list-item-left">
						<a href={'/cooka-productDetail-web/productDetailPage?productId=' + item.productId} target="_blank"><img className="search-products-list-item-img" width="180" height="180" src={item.image}/></a>
						</div>
						<div className="search-products-list-item-middle">
							<a href={'/cooka-productDetail-web/productDetailPage?productId=' + item.productId} target="_blank" className="search-products-list-item-title">
								{item.title}
							</a>
							<span className="search-products-list-item-tip">
								<span className="search-products-list-item-tip-left">
									{item.store}
								</span>
								{item.stalls}
							</span>
						</div>
						<div className="search-products-list-item-right">
							<span className="search-products-list-item-price">
								￥{item.priceRange}
							</span>
						</div>
					</div>
					);
			});
		}

		return (
			<div className="search-products">
				{showType==='block'?<div className="search-products-grid">
					{products}
				</div>:
				<div className="search-products-list">
					{products}
				</div>}
				<Pagination pageNum={pageNum} hasPrevious={hasPrevious} navigatepageNums={navigatepageNums} hasNextPage={hasNextPage} totalPages={totalPages} changePage={this.changePage}/>
			</div>
		);
	},
	changePage: function(pageNum) {
		var obj = {};
		obj.page = pageNum-1;
		this.props.changePage(obj);
	}
});

var SearchHot = React.createClass({
	getInitialState:function(){
		return{
			hslist:[]
		}
	},
	componentDidMount:function(){
		var g = {
			groupId:2
		} 
		SearchUtil.getHotSaleGoodsInfo(g,function(res){
			this.setState({
				hslist:res.list
			});
		}.bind(this));
	},

	render: function() {
		var hsItems = this.state.hslist.map(function(item, index){
			return(
				<div className="search-hot-item" key={index}>
					<img src={item.productimage} width="100%"/>
					<span className="search-hot-item-label">
						热销
					</span>
					<div className="search-hot-item-detail">
						<span className="search-hot-item-detail-price">
							￥520.00
						</span>
						<a href="#" className="search-hot-item-detail-title">
							{item.title}
						</a>
						<span className="search-hot-item-detail-tip">
							{item.store}
						</span>
					</div>
				</div>
			);
			
		});
		return (
			<div className="search-hot">
				<div className="search-hot-header">
					<span className="search-hot-header-en">
						HOT
					</span>
					热销商品
				</div>
				{hsItems}
				{/*<div className="search-hot-item">
					<img src="./images/prosearch.png" width="100%"/>
					<span className="search-hot-item-label">
						热销
					</span>
					<div className="search-hot-item-detail">
						<span className="search-hot-item-detail-price">
							￥520.00
						</span>
						<a href="#" className="search-hot-item-detail-title">
							战地吉普男士牛仔卫裤 2016 春秋装新款
						</a>
						<span className="search-hot-item-detail-tip">
							宝立美服饰
						</span>
					</div>
				</div>
				<div className="search-hot-item">
					<img src="./images/prosearch.png" width="100%"/>
					<span className="search-hot-item-label">
						热销
					</span>
					<div className="search-hot-item-detail">
						<span className="search-hot-item-detail-price">
							￥520.00
						</span>
						<a href="#" className="search-hot-item-detail-title">
							战地吉普男士牛仔卫裤 2016 春秋装新款
						</a>
						<span className="search-hot-item-detail-tip">
							宝立美服饰
						</span>
					</div>
				</div>
				<div className="search-hot-item">
					<img src="./images/prosearch.png" width="100%"/>
					<span className="search-hot-item-label">
						热销
					</span>
					<div className="search-hot-item-detail">
						<span className="search-hot-item-detail-price">
							￥520.00
						</span>
						<a href="#" className="search-hot-item-detail-title">
							战地吉普男士牛仔卫裤 2016 春秋装新款
						</a>
						<span className="search-hot-item-detail-tip">
							宝立美服饰
						</span>
					</div>
				</div>
				<div className="search-hot-item">
					<img src="./images/prosearch.png" width="100%"/>
					<span className="search-hot-item-label">
						热销
					</span>
					<div className="search-hot-item-detail">
						<span className="search-hot-item-detail-price">
							￥520.00
						</span>
						<a href="#" className="search-hot-item-detail-title">
							战地吉普男士牛仔卫裤 2016 春秋装新款
						</a>
						<span className="search-hot-item-detail-tip">
							宝立美服饰
						</span>
					</div>
				</div>*/}
			</div>
		);
	}
});

var BreadCrumb = React.createClass({
	render: function(){
		var searchCategory = this.props.searchCategory;
		var category = [];
		if (searchCategory) {
			category = searchCategory.searchId.map(function(item,index){
				return (
					<li className="search-breadcrumb-li" key={index}> > <a href="#" className="search-breadcrumb-li-a">{item.category}</a></li>
				);
			});
		}
		var fq = this.props.fq;
		var styles = [];
		if (fq) {
			styles = fq.map(function(item,index){
				return (
					<li className="search-breadcrumb-li"> > <a href="#" className="search-breadcrumb-li-a active">{item}<span className="icon-cha"></span></a></li>
					);
			});
		}
		return (
			<ol className="search-breadcrumb list-unstyled">
			  <li className="search-breadcrumb-li">所有分类&nbsp;</li>
			  {category}
			  {styles}
			</ol>
		);
	}
});

var SearchRecommend = React.createClass({
	getInitialState:function(){
		return {
			srlist:[]
		}
	},
	componentDidMount:function(){
		var gp = {
			groupId:3,
			pageSize:10
		}
		SearchUtil.getPopularRecommendedInfo(gp,function(res){
			this.setState({
				srlist:res.list
			});
		}.bind(this));
	},
	render: function() {
		var srItems = this.state.srlist.map(function(item, index){
			return (
				<div className="search-recommend-products-item" key={index}>
					<img src={item.productimage} width="100%"/>
					<div className="search-recommend-products-item-detail">
						<span className="search-recommend-products-item-detail-price">
							￥520.00
						</span>
						<a href="#" className="search-recommend-products-item-detail-title">
							{item.title}
						</a>
						<span className="search-recommend-products-item-detail-tip">
							<span>
								{item.store}
							</span>
							<span className="search-recommend-products-item-detail-tip-rigth">
								{item.position}
							</span>
						</span>
					</div>
				</div>
			);
		});
		return (
			<div className="search-recommend">
				<div className="search-recommend-header">
					<span className="search-recommend-header-en">
						HOT
					</span>
					人气推荐
				</div>
				<div className="search-recommend-products">
				{srItems}
					{/*<div className="search-recommend-products-item">
						<img src="./images/prosearch.png" width="100%"/>
						<div className="search-recommend-products-item-detail">
							<span className="search-recommend-products-item-detail-price">
								￥520.00
							</span>
							<a href="#" className="search-recommend-products-item-detail-title">
								战地吉普男士牛仔卫裤 2016 春秋装新款
							</a>
							<span className="search-recommend-products-item-detail-tip">
								<span>
									宝立美服饰
								</span>
								<span className="search-recommend-products-item-detail-tip-rigth">
									大西豪 823档
								</span>
							</span>
						</div>
					</div>
					<div className="search-recommend-products-item">
						<img src="./images/prosearch.png" width="100%"/>
						<div className="search-recommend-products-item-detail">
							<span className="search-recommend-products-item-detail-price">
								￥520.00
							</span>
							<a href="#" className="search-recommend-products-item-detail-title">
								战地吉普男士牛仔卫裤 2016 春秋装新款
							</a>
							<span className="search-recommend-products-item-detail-tip">
								<span>
									宝立美服饰
								</span>
								<span className="search-recommend-products-item-detail-tip-rigth">
									大西豪 823档
								</span>
							</span>
						</div>
					</div>
					<div className="search-recommend-products-item">
						<img src="./images/prosearch.png" width="100%"/>
						<div className="search-recommend-products-item-detail">
							<span className="search-recommend-products-item-detail-price">
								￥520.00
							</span>
							<a href="#" className="search-recommend-products-item-detail-title">
								战地吉普男士牛仔卫裤 2016 春秋装新款
							</a>
							<span className="search-recommend-products-item-detail-tip">
								<span>
									宝立美服饰
								</span>
								<span className="search-recommend-products-item-detail-tip-rigth">
									大西豪 823档
								</span>
							</span>
						</div>
					</div>
					<div className="search-recommend-products-item">
						<img src="./images/prosearch.png" width="100%"/>
						<div className="search-recommend-products-item-detail">
							<span className="search-recommend-products-item-detail-price">
								￥520.00
							</span>
							<a href="#" className="search-recommend-products-item-detail-title">
								战地吉普男士牛仔卫裤 2016 春秋装新款
							</a>
							<span className="search-recommend-products-item-detail-tip">
								<span>
									宝立美服饰
								</span>
								<span className="search-recommend-products-item-detail-tip-rigth">
									大西豪 823档
								</span>
							</span>
						</div>
					</div>
					<div className="search-recommend-products-item">
						<img src="./images/prosearch.png" width="100%"/>
						<div className="search-recommend-products-item-detail">
							<span className="search-recommend-products-item-detail-price">
								￥520.00
							</span>
							<a href="#" className="search-recommend-products-item-detail-title">
								战地吉普男士牛仔卫裤 2016 春秋装新款
							</a>
							<span className="search-recommend-products-item-detail-tip">
								<span>
									宝立美服饰
								</span>
								<span className="search-recommend-products-item-detail-tip-rigth">
									大西豪 823档
								</span>
							</span>
						</div>
					</div>
					<div className="search-recommend-products-item">
						<img src="./images/prosearch.png" width="100%"/>
						<div className="search-recommend-products-item-detail">
							<span className="search-recommend-products-item-detail-price">
								￥520.00
							</span>
							<a href="#" className="search-recommend-products-item-detail-title">
								战地吉普男士牛仔卫裤 2016 春秋装新款
							</a>
							<span className="search-recommend-products-item-detail-tip">
								<span>
									宝立美服饰
								</span>
								<span className="search-recommend-products-item-detail-tip-rigth">
									大西豪 823档
								</span>
							</span>
						</div>
					</div>*/}
				</div>
			</div>
		);
	}
});
var Search = React.createClass({
	getInitialState: function() {
		return {
			data: null
		};
	},
	componentDidMount: function(){
		var resultQuery = this.props.location.query;
		SearchUtil.getData(resultQuery,function(res){
			this.setState({
				data:res
			})
		}.bind(this));
	},
	render: function () {
		var data = this.state.data;
		var dataPrice = null;
		if (data) {
			dataPrice = data.price;
		}
		var price = {
			startPrice: '',
			endPrice: ''
		}
		if (dataPrice) {
			var arr = dataPrice.split('-')
			price.startPrice = arr[0];
			price.endPrice = arr[1];
		}
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="search">
						{data?<BreadCrumb searchCategory={data.searchCategory} fq={data.fq}/>:null}
						{data?<SearchConditions data={data} changeQueryObject={this.changeQueryObject}/>:null}
						{data?<SearchBar changeShowType={this.changeShowType} changeQueryObject={this.changeQueryObject} sequence={data.sequence} price={price} showType={data.showType} changePriceRange={this.changePriceRange}/>:null}
						{data?<SearchProducts showType={data.showType} pageNum={data.pageNum} totalPages={data.totalPages} hasNextPage={data.hasNextPage} searchProducts={data.searchProducts} hasPrevious={data.hasPrevious}
							navigatepageNums={data.navigatepageNums} changePage={this.changeQueryObject}/>:null}
						{data?<SearchHot/>:null}
						<SearchRecommend/>
					</div>
				</div>
			</div>
		);
	},
	changeShowType: function(type){
		var locationQuery = {};
		if (this.props.location.query) {
			locationQuery = this.props.location.query;
			
		}
        locationQuery.showType = type;
		window.location.href = '/cooka-search/searchProduct?'+qs.stringify(locationQuery);
	},
	changePriceRange: function(priceRange) {
		var locationQuery = {};
		if (this.props.location.query) {
			locationQuery = this.props.location.query;
		}
        locationQuery.price = priceRange;
		window.location.href = '/cooka-search/searchProduct?'+qs.stringify(locationQuery);
	},
	changeQueryObject: function(data){
		var locationQuery = {};
		if (this.props.location.query) {
			locationQuery = this.props.location.query;
		}
		var newObj = _.assign({}, locationQuery, data);
		window.location.href = '/cooka-search/searchProduct?'+qs.stringify(newObj);
	}
});

module.exports = Search;