require('slick-carousel/slick/slick.less');
require('../../less/index.less');
var React = require('react');
var Slick = require('react-slick');

var CkHr = require('./CkHr.js');

var IndexCategory = React.createClass({
	render: function() {
		return (
			<div className="index-category">
				<div className="index-category-block">
					<a href="#" className="index-category-lv-1">女装</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
					<a href="#" className="index-category-lv-2">连衣裙</a>
				</div>
			</div>
			);
	}
});

var IndexCarousel = React.createClass({
	render: function() {
		var carouselSetting = {
			dots: true,
			arrows: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 3000,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: <button><span className="icon-xiangqian"/></button>,
			nextArrow: <button><span className="icon-xianghou"/></button>,
			dotsClass: 'index-carousel-dots'
		}

		return (
			<div className="index-carousel">
				<Slick {...carouselSetting}>
					<div className="index-carousel-item">
						<a href="#">
							<img src="/images/1000x500.png" />
						</a>
					</div>
					<div className="index-carousel-item">
						<a href="#">
							<img src="/images/1000x500.png" />
						</a>
					</div>
					<div className="index-carousel-item">
						<a href="#">
							<img src="/images/1000x500.png" />
						</a>
					</div>
				</Slick>
			</div>
			);
	}
});

var IndexNote = React.createClass({
	render: function() {
		return (
			<div className="index-note">
				<h4 className="index-note-title">
					<span className="icon-gonggao"/>商城公告
					<a href="#" className="index-note-more">
						<span className="icon-gengduo" />
					</a>
				</h4>
				<div className="index-note-items">
					<a href="#" className="index-note-item">
						[公告] 我是标题我是标题我是标题我是标题我是标题
					</a>
					<a href="#" className="index-note-item">
						[公告] 我是标题我是标题我是标题我是标题我是标题
					</a>
					<a href="#" className="index-note-item">
						[公告] 我是标题我是标题我是标题我是标题我是标题
					</a>
				</div>
			</div>
			);
	}
});

var IndexGoToTop = React.createClass({
	render: function() {
		return (
			<a href="#" title="返回页面顶部" className="index-go-to-top">
				<span className="icon-zhiding" />
			</a>
			);
	}
});

var IndexProduct = React.createClass({
	render: function() {
		return (
			<div className="index-product">
				<a href="#" className="index-product-link">
					<img src="/images/250x250.png" />
				</a>
				<div className="index-product-price">
					¥ 123
					<a href="#" className="index-product-fav" title="收藏商品" style={{display:'none'}}>
						<span className="icon-shoucang" />
					</a>
				</div>
				<div className="index-product-extra">
					<a href="#" className="index-product-store">
						店铺名称
					</a>
					<span className="index-product-market">
						市场 档口号
					</span>
				</div>
			</div>
			);
	}
});

var IndexNew = React.createClass({
	render: function() {
		return (
			<div className="index-block index-block-new">
				<h4 className="index-block-title">
					<span className="index-block-title-label">
					NEW
					</span>
					新品上架

					<a href="#" className="index-block-title-aside">
						换一批
						<span className="icon-huanyipi" />
					</a>
				</h4>

				<div className="index-block-body">
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
				</div>
			</div>
			);
	}
});

var IndexStoreItem = React.createClass({
	render: function() {
		return (
			<div className="index-store">
				<div className="index-store-info">
					<div className="index-store-name">
						店铺名称
					</div>
					<div className="index-store-market">
						市场 档口号
					</div>

					<a href="#" className="index-store-link">
						进店逛逛
					</a>
				</div>

				<a href="#" className="index-store-product">
					<img src="/images/250x250.png" />
				</a>
			</div>
			);
	}
});

var IndexStore = React.createClass({
	render: function() {
		return (
			<div className="index-block index-block-store">
				<h4 className="index-block-title">
					<span className="index-block-title-label">
					HOT
					</span>
					推荐店铺

					<a href="#" title="更多" className="index-block-title-aside index-block-title-aside-lg">
						<span className="icon-more" />
					</a>
				</h4>

				<div className="index-block-body">
					<IndexStoreItem />
					<IndexStoreItem />
					<IndexStoreItem />
					<IndexStoreItem />
					<IndexStoreItem />
				</div>
			</div>
			);
	}
});

var IndexGirl = React.createClass({
	render: function() {
		return (
			<div className="index-block index-block-girl">
				<h4 className="index-block-title">
					<span className="index-block-title-label">
					GIRL
					</span>
					女装

					<a href="#" title="更多" className="index-block-title-aside index-block-title-aside-lg">
						<span className="icon-more" />
					</a>
				</h4>

				<div className="index-block-body">
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
					<IndexProduct />
				</div>
			</div>
			);
	}
});

var Index = React.createClass({
	render: function () {
		return (
			<div className="row">
				<div className="col-md-12 trim-col">
					<div className="index">
						<div className="index-top">
							<IndexCategory />
							<IndexCarousel />
							<IndexNote />
						</div>
						<CkHr />

						<IndexNew />
						<IndexStore />
						<IndexGirl />

						<IndexGoToTop />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = Index;