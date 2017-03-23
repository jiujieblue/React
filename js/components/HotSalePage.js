require('../../less/hotsalepage.less');
require('slick-carousel/slick/slick.less');
var React = require('react');
var Slider = require('react-slick');
var HotSalePageUtil = require('../utils/HotSalePageUtil.js');

var HotSaleSlick = React.createClass({
	getInitialState:function(){
		return{
			hsleftlist:this.props.hsleftlist
		}		
	},
	componentDidMount:function(){
		HotSalePageUtil.getGoodsInfo({groupId: 1},function(res){
			this.setState({
				hsleftlist:res.list
			});
		}.bind(this));

	},
	render:function(){
		var settings = {
		  arrows: true,
	      dots: true,
	      infinite: true,
	      autoplay:true,
	      autoplaySpeed:6000,
	      dots:true,
	      speed: 500,
	      slidesToShow: 4,
	      slidesToScroll: 4,
	      prevArrow: <button><span className="icon-xiangqian"/></button>,
	      nextArrow: <button><span className="icon-xianghou"/></button>,
	      dotsClass:'hotsalepage-left-todayhotsale-viwepager-dots'

	    };
	    var items = this.state.hsleftlist.map(function(item,index){
	    	return(
	    		<div className="hotsalepage-left-todayhotsale-viwepager-myslider-item" key={index}>
					<div>
						<img className="hotsalepage-left-todayhotsale-viwepager-myslider-item-simg" src={item.productimage} />
						<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-price">¥{item.upperPrice}</span>
						<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-title"><a href="#">{item.title}</a></span>
						<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-spanleft">宝丽美服饰</span>
						<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-spanright">大西豪823档</span>
					</div>
				</div>
	    	);
	    });
	    return (
			<div className="hotsalepage-left-todayhotsale-viwepager">
				<Slider {...settings} className="hotsalepage-left-todayhotsale-viwepager-myslider">
					{items}
					<div className="hotsalepage-left-todayhotsale-viwepager-myslider-item">
						<div>
							<img className="hotsalepage-left-todayhotsale-viwepager-myslider-item-simg" src="./images/hot-sale-today.jpg" />
							<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-price">¥1000</span>
							<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-title">泓清战地抱款牛仔卫裤2016春秋装新款</span>
							<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-spanleft">宝丽美服饰</span>
							<span className="hotsalepage-left-todayhotsale-viwepager-myslider-item-spanright">大西豪823档</span>
						</div>
					</div>
				</Slider>
			</div>
	    );
	}
});

var HotSalePage = React.createClass({
	getInitialState:function(){
		return{
			hsleftlist:[],
			hsrightlist:[]
		};
	},
	componentDidMount:function(){
		HotSalePageUtil.getHotSaleGoodsInfo({groupId: 2},function(res){
			this.setState({
				hsleftlist:res.list,
				hsrightlist:res.list
			});
		}.bind(this));
	},
	render: function () {
		var witems = this.state.hsleftlist.map(function(item,index){

			return(
				<li key={index}>
					<div className="hotsalepage-left-womenhotsale-links-item">
						<img className="hotsalepage-left-womenhotsale-links-item-wimg" src={item.productimage} />
						<span className="hotsalepage-left-womenhotsale-links-item-price">¥{item.upperPrice}</span>
						<span className="hotsalepage-left-womenhotsale-links-item-title"><a href="#">{item.title}</a></span>
						<span className="hotsalepage-left-womenhotsale-links-item-spanleft">{item.store}</span>
						<span className="hotsalepage-left-womenhotsale-links-item-spanright">{item.position}</span>
					</div>
				</li>
			);
		});
		var mitems = this.state.hsleftlist.map(function(item,index){

			return(
				<li key={index}>
					<div className="hotsalepage-left-manhotsale-links-item">
						<img className="hotsalepage-left-manhotsale-links-item-mimg" src={item.productimage} />
						<span className="hotsalepage-left-manhotsale-links-item-price">¥{item.upperPrice}</span>
						<span className="hotsalepage-left-manhotsale-links-item-title"><a href="#">{item.title}</a></span>
						<span className="hotsalepage-left-manhotsale-links-item-spanleft">{item.store}</span>
						<span className="hotsalepage-left-manhotsale-links-item-spanright">{item.position}</span>
					</div>
				</li>
			);
		});
		var rightItems = this.state.hsrightlist.map(function(item,index){
			return(
				<li key={index}>
					<div className="hotsalepage-right-links-item">
						<span className="hotsalepage-right-links-item-hotnum">{index + 1}</span>
						<img className="hotsalepage-right-links-item-himg" src={item.productimage}/>
						<span className="hotsalepage-right-links-item-price">¥{item.upperPrice}</span>
						<span className="hotsalepage-right-links-item-title"><a href="#">{item.title}</a></span>
						<span className="hotsalepage-right-links-item-spanleft">{item.store}</span>
					</div>
				</li>
			);
		});
		return (
			<div className="row">
				<div className="col-md-12 trim-col">
					<div className="hotsalepage">
						<div className="hotsalepage-left">
							<div className="col-md-10 trim-col">
								<div className="hotsalepage-left-todayhotsale clearfix">
									<div className="hotsalepage-left-todayhotsale-top">
										<span className="hotsalepage-left-todayhotsale-top-hotone">HOT</span>
										<span className="hotsalepage-left-todayhotsale-top-hotonetitle">今日爆款</span>
									</div>
									<hr className="ck-hr"/>
									<HotSaleSlick {...this.state}/>
								</div>
								<div className="hotsalepage-left-womenhotsale clearfix">
									<div className="hotsalepage-left-womenhotsale-top">
										<span className="hotsalepage-left-womenhotsale-top-hottwo">HOT</span>
										<span className="hotsalepage-left-womenhotsale-top-hottwotitle">女装爆款</span>
										<span className="hotsalepage-left-womenhotsale-top-moreicon icon-more" />
									</div>
									<hr className="ck-hr"/>
									<div className="hotsalepage-left-womenhotsale-links">
										<ul>
											<li><img className="hotsalepage-left-womenhotsale-links-wbigimg" src="./images/women-bk-show-440×335.jpg"/></li>
											{witems}
											<li>
												<div className="hotsalepage-left-womenhotsale-links-item">
													<img className="hotsalepage-left-womenhotsale-links-item-wimg" src="./images/women-bk-pic.jpg" />
													<span className="hotsalepage-left-womenhotsale-links-item-price">¥520.00</span>
													<span className="hotsalepage-left-womenhotsale-links-item-title">韩红战地抱款牛仔卫裤2016春秋装新款</span>
													<span className="hotsalepage-left-womenhotsale-links-item-spanleft">宝丽美服饰</span>
													<span className="hotsalepage-left-womenhotsale-links-item-spanright">大西豪823档</span>
												</div>
											</li>
											<li>
												<div className="hotsalepage-left-womenhotsale-links-item">
													<img className="hotsalepage-left-womenhotsale-links-item-wimg" src="./images/women-bk-pic.jpg" />
													<span className="hotsalepage-left-womenhotsale-links-item-price">¥520.00</span>
													<span className="hotsalepage-left-womenhotsale-links-item-title">韩红战地抱款牛仔卫裤2016春秋装新款</span>
													<span className="hotsalepage-left-womenhotsale-links-item-spanleft">宝丽美服饰</span>
													<span className="hotsalepage-left-womenhotsale-links-item-spanright">大西豪823档</span>
												</div>
											</li>
											<li>
												<div className="hotsalepage-left-womenhotsale-links-item">
													<img className="hotsalepage-left-womenhotsale-links-item-wimg" src="./images/women-bk-pic.jpg" />
													<span className="hotsalepage-left-womenhotsale-links-item-price">¥520.00</span>
													<span className="hotsalepage-left-womenhotsale-links-item-title">韩红战地抱款牛仔卫裤2016春秋装新款</span>
													<span className="hotsalepage-left-womenhotsale-links-item-spanleft">宝丽美服饰</span>
													<span className="hotsalepage-left-womenhotsale-links-item-spanright">大西豪823档</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div className="hotsalepage-left-manhotsale clearfix">
									<div className="hotsalepage-left-manhotsale-top">
										<span className="hotsalepage-left-manhotsale-top-hotthree">HOT</span>
										<span className="hotsalepage-left-manhotsale-top-hotthreetitle">男装爆款</span>
										<span className="hotsalepage-left-manhotsale-top-moreicon icon-more"></span>
									</div>
									<hr className="ck-hr"/>
									<div className="hotsalepage-left-manhotsale-links">
										<ul>
											<li><img className="hotsalepage-left-manhotsale-links-wbigimg" src="./images/women-bk-show-440×335.jpg"/></li>
											{mitems}
											<li>
												<div className="hotsalepage-left-manhotsale-links-item">
													<img className="hotsalepage-left-manhotsale-links-item-mimg" src="./images/women-bk-pic.jpg" />
													<span className="hotsalepage-left-manhotsale-links-item-price">¥520.00</span>
													<span className="hotsalepage-left-manhotsale-links-item-title">韩红战地抱款牛仔卫裤2016春秋装新款</span>
													<span className="hotsalepage-left-manhotsale-links-item-spanleft">宝丽美服饰</span>
													<span className="hotsalepage-left-manhotsale-links-item-spanright">大西豪823档</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="hotsalepage-right">
							<div className="col-md-2 trim-right">
								<div className="hotsalepage-right-top">
									<span className="hotsalepage-right-top-myicon icon-rexiaopaihang"/>
									<span className="hotsalepage-right-top-hotfourtitle">热销排行</span>
								</div>
								<hr className="ck-hr"/>
								<div className="hotsalepage-right-links">
									<ul>
										{rightItems}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = HotSalePage;