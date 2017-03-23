require('../../less/my-fav.less');
var React = require('react');

var MyFavUtil = require('../utils/MyFavUtil.js');

var CkPagination = require('./CkPagination.js');

var MvFavCarouselNew = React.createClass({
	getInitialState: function() {
		return {
			type: 1,
			page: 0
		}
	},
	render: function() {
		var me = this;
		var items = this.props.list.map(function(item, index) {
			return (
				<div key={index}>
					<a href="#">
						<img src={item.image} />
					</a>
					<p>
						{me.props.isTraditionalStore ? '货号: ' + item.productNum : '¥ ' + item.priceRange}
					</p>
					<a href="#">							
						{item.title}
					</a>
				</div>
			)
		});
		return (
			<div className="my-fav-item">
				<span className="icon-xiangqian" onClick={this.clickPage} direction="<"></span>
					{items}
				<span className="icon-xianghou" onClick={this.clickPage} direction=">"></span>
			</div>
			);
	},
	clickPage: function(e) {
		var me = this;
		var dir = (e.target).getAttribute('direction');
		var q = {
			size: 4,
			orderBy: me.state.type === 1 ? 'latest' : 'recommendProduct',
			store: me.props.storeSerialNum,
			page: ( function() {
				if (dir == '<') {
					if (me.state.page > 0) {
						return --me.state.page;
					} else {
						return me.state.page;
					}
				}
				if (dir == '>') {
					if (me.props.hasNext) {
						return ++me.state.page;
					} else {
						return me.state.page;
					}
				}
			} )()
		};
		this.props.clickPage(q);
	}
});

var MvFavCarouselHot = React.createClass({
	getInitialState: function() {
		return {
			type: 2,
			page: 0
		}
	},

	render: function() {
		var me = this;
		var items = this.props.list.map(function(item, index) {
			return (
				<div key={index}>
					<a href="#">
						<img src={item.image} />
					</a>
					<p>
						{me.props.isTraditionalStore ? '货号: ' + item.productNum : '¥ ' + item.priceRange}
					</p>
					<a href="#">							
						{item.title}
					</a>
				</div>
			)
		});
		return (
			<div className="my-fav-item">
				<span className="icon-xiangqian" onClick={this.clickPage} direction="<"></span>
					{items}
				<span className="icon-xianghou" onClick={this.clickPage} direction=">"></span>
			</div>
			);
	},
	clickPage: function(e) {
		var me = this;
		var dir = (e.target).getAttribute('direction');
		var q = {
			size: 4,
			orderBy: me.state.type === 1 ? 'latest' : 'recommendProduct',
			store: me.props.storeSerialNum,
			page: ( function() {
				if (dir == '<') {
					if (me.state.page > 0) {
						return --me.state.page;
					} else {
						return me.state.page;
					}
				}
				if (dir == '>') {
					if (me.props.hasNext) {
						return ++me.state.page;
					} else {
						return me.state.page;
					}
				}
			} )()
		};

		this.props.clickPage(q);
	}
});

var TabList = React.createClass({
	getInitialState: function() {
		return {
			isTraditionalStore: false,
			type: 1,
			list: [],
			page: 0,
			hasNext: false
		};
	},

	componentDidMount: function() {
		var q = {
			size: 4,
			orderBy: this.state.type === 1 ? 'latest' : 'recommendProduct',
			store: this.props.storeSerialNum,
			page: this.state.page
		};

		MyFavUtil.getSearchProductResult(q, function(res) {
			this.setState({
				isTraditionalStore: res.isTraditionalStore,
				list: res.searchProducts,
				hasNext: res.hasNextPage
			})
		}.bind(this));
	},

	render: function() {
		return (
			<div className="my-fav-shangjia-pro-guide">
				<ul>
					<li>
						<a href='#' className={this.state.type === 1 ? 'active' : ''} onClick={this._clickTab.bind(this, 1)}>
							最新上架
						</a>
					</li>
					<li>
						<a href='#' className={this.state.type === 2 ? 'active' : ''} onClick={this._clickTab.bind(this, 2)}>
							本店热卖
						</a>
					</li>
				</ul>

				{
			this.state.type === 1 ?
				<MvFavCarouselNew list={this.state.list} storeSerialNum={this.props.storeSerialNum} isTraditionalStore={this.state.isTraditionalStore} hasNext={this.state.hasNext} clickPage={this.clickPage}/> : null
			}

				{
			this.state.type === 2 ?
				<MvFavCarouselHot list={this.state.list} storeSerialNum={this.props.storeSerialNum} isTraditionalStore={this.state.isTraditionalStore} hasNext={this.state.hasNext} clickPage={this.clickPage}/> : null
			}

			</div>
			);
	},

	_clickTab: function(t, e) {
		e.preventDefault();
		this.setState({
			isTraditionalStore: false,
			type: t,
			page: 0
		});

		var q = {
			size: 4,
			orderBy: t === 1 ? 'latest' : 'recommendProduct',
			store: this.props.storeSerialNum
		};

		MyFavUtil.getSearchProductResult(q, function(res) {
			this.setState({
				isTraditionalStore: res.isTraditionalStore,
				list: res.searchProducts,
				hasNext: res.hasNextPage
			});
		}.bind(this));
	},

	clickPage: function(q) {
		MyFavUtil.getSearchProductResult(q, function(res) {
			this.setState({
				isTraditionalStore: res.isTraditionalStore,
				list: res.searchProducts,
				hasNext: res.hasNextPage
			});
		}.bind(this));
	}
});


var MyFav = React.createClass({
	getInitialState: function() {
		var p = 1;
		if (this.props.location.query && this.props.location.query.page) {
			p = this.props.location.query.page;
		}

		return {
			list: [],
			hasNextPage: false,
			hasPreviousPage: false,
			navigatepageNums: [],
			nextPage: 0,
			pageNum: p,
			pages: 0,
			prePage: 0
		};
	},

	componentDidMount: function() {
		MyFavUtil.getMyFav({page: this.state.pageNum}, function(res) {
			this.setState({
				list: res.list,
				hasNextPage: res.hasNextPage,
				hasPreviousPage: res.hasPreviousPage,
				navigatepageNums: res.navigatepageNums,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages,
				prePage: res.prePage
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.list.map(function(item, index) {
			return (
				<div className="my-fav-shangjia" key={index}>
					<div className="my-fav-shangjia-detail  col-md-3">
						<div className="my-fav-shangjia-detail-name">
							<div>
								<img src={item.storeLogo}/>
							</div>
							<div>
								<p>
									<a href="#">{item.storeName}</a>
								</p>
								<p>{item.phone}</p>
							</div>
						</div>
						<div className="my-fav-shangjia-detail-add">
							<p>市场：{item.market}</p>
							<p>楼层：{item.floor}</p>
							<p>档口：{item.stalls}</p>
						</div>
						<div className="my-fav-shangjia-detail-oth">
							<a href="#" onClick={this.del.bind(this, item.storeSerialNum)}>
								<span className="icon-shanchu"/>				
								删除
							</a>
							<a href="#">进店逛逛</a>
						</div>
					</div>

					<div className="my-fav-shangjia-pro col-md-9">
						<TabList storeSerialNum={item.storeSerialNum}/>
					</div>
				</div>
				);
		}, this);

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="my-fav">
						<div className="my-fav-shop">
							<span className="icon-guanzhudianjia"/>我关注的店家<span>({items.length}家)</span>
						</div>
						{items}
						<CkPagination {...this.state} query={this.props.location.query}/>
					</div>
				</div>
			</div>
			);
	},
	del: function(a, e) {
		e.preventDefault();
		var q = {
			storeSerialNum: a
		}
		MyFavUtil.getNewProductResult(q, function() {
			// success
			window.location.reload();
		}.bind(this));
	}
});

module.exports = MyFav;