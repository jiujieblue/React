require('../../less/header.less');

var React = require('react');
var CkSearch = require('./CkSearch.js');

var HeaderTop = React.createClass({
	render: function() {
		return (
			<div className="header-top">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							你好，欢迎光临柯咔商城！
						</div>
						<div className="col-md-3 trim-left" style={{display:'none'}}>
							<div className="text-left">
								<a href="/sign_in.html" className="header-top-link">
									请登录
								</a>
								<span className="header-top-sep">|</span>
								<a href="/sign_up.html" className="header-top-link">
									免费注册
								</a>
							</div>
						</div>
						<div className="col-md-6" style={{display:'none'}}>
							<div className="text-right">
								<a href="/shangjiaruzhu" className="header-top-link">
									商家入驻
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

var HeaderInner = React.createClass({
	render: function() {
		return (
			<div className="header-inner">
				<div className="container">
					<div className="row">
						<div className="col-md-2">
							<div className="header-logo">
								<img src="/images/logo.svg" width="150"/>
							</div>
						</div>
						<div className="col-md-8">
							<CkSearch />
						</div>
						<div className="col-md-2">
							<div className="header-qrcode">
								<img src="/images/qrcode.jpg" width="100" height="100"/>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

var HeaderNav = React.createClass({
	render: function() {
		return (
			<div className="header-nav">
				<div className="header-nav-inner">
					<span href="#" className="header-category-all">
						<a href="#"> 全部商品分类 <span className="icon-xianghou"/></a>

						<ul className="header-category-lv-1">
							<li>
								<a href="#">一级类目 <span className="icon-xianghou"/></a>
								<ul className="header-category-lv-2">
									<li>
										<a href="#">二级类目</a>
										<ul className="header-category-lv-3">
											<li><a href="#">三级类目</a></li>
											<li><a href="#">三级类目</a></li>
										</ul>
									</li>
									<li>
										<a href="#">二级类目</a>
										<ul className="header-category-lv-3">
											<li><a href="#">三级类目</a></li>
											<li><a href="#">三级类目</a></li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								<a href="#">一级类目 <span className="icon-xianghou"/></a>
								<ul className="header-category-lv-2">
									<li>
										<a href="#">二级类目</a>
										<ul className="header-category-lv-3">
											<li><a href="#">三级类目</a></li>
											<li><a href="#">三级类目</a></li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</span>

					<ul className="header-nav-items">
						<li className="header-nav-item active"><a href="#">首页</a></li>
						<li className="header-nav-item"><a href="#">爆款专区</a></li>
						<li className="header-nav-item"><a href="#">逛市场</a></li>
						<li className="header-nav-item" style={{display:'none'}}><a href="#">我的关注</a></li>
					</ul>
				</div>
			</div>
			);
	}
});

var Header = React.createClass({
	getDefaultProps: function() {
		return  {
			showCategory: true
		};
	},
	render: function() {
		return (
			<div className="header">
				<HeaderTop />
				<HeaderInner />
				
				{ this.props.showCategory ? <HeaderNav /> : <div className="header-line"/> }
			</div>
			);
	}
});

module.exports = Header;