require('../../less/buyer-focus.less');
var React = require('react');
var BuyerSide = require('./BuyerSide.js');
var Modal = require('react-Modal');
var BuyerFocusUtil = require('../utils/BuyerFocusUtil.js');
var BuyerFocus = React.createClass({
	getInitialState:function(){
		return{
			modalIsOpen: false,
			menu:1,
			data:'',
			list:[],
			storeId:'',
			paixu:1
		}
	},
	componentDidMount:function(){
		BuyerFocusUtil.getData(function(res){
			this.setState({
				data:res,
				list:res.list
			})
		}.bind(this))
	},
	openModal: function(t) {
		var me=this;
		me.setState({
			modalIsOpen: true,
			storeId:me.state.list[t].storeId
		});
	},
	afterOpenModal: function() {
    // references are now sync'd and can be accessed.
      this.refs.subtitle.style.color = '#fcc506';
      this.refs.subtitle.style.borderBottom = '2px solid #fcc506';
      this.refs.subtitle.style.paddingBottom = '15px';
      this.refs.cont.style.marginTop = '60px';
      this.refs.caozuo.style.marginTop = '60px';
      this.refs.caozuo.style.borderTop = '1px solid #ddd';
      this.refs.caozuo.style.padding = '55px 10px';
      this.refs.caozuo.style.overflow = 'hidden';
      this.refs.close.style.float = 'left';
      this.refs.close.style.width = '210px';
      this.refs.close.style.height = '58px';
      this.refs.close.style.border = '1px solid #ddd';
      this.refs.close.style.borderRadius = '5px';      
      this.refs.close.style.background = '#fff';      
      this.refs.yes.style.float = 'right';
      this.refs.yes.style.width = '210px';
      this.refs.yes.style.height = '58px';
      this.refs.yes.style.border = '1px solid #ddd';
      this.refs.yes.style.borderRadius = '5px';      
      this.refs.yes.style.background = '#fcc506';      
    },
	_changeMenu:function(t){
		this.setState({
			menu:t
		})
	},
	closeModal: function() {
      this.setState({modalIsOpen: false});
    },
    _del:function(){
		var me = this;
		me.closeModal();
		BuyerFocusUtil.del({storeId: me.state.storeId}, function(res) {
			if (res == 'success') {
				window.location.reload();
			}
		})
    },
    _paixu:function(){
		var me = this;
		me.setState({
			list:(function(){
				me.state.list.reverse();
				return me.state.list
			})()
		})
    },
	render: function () {
		var mStyle = {
			overlay: {
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(176, 176, 176, 0.8)'
			},
			content: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '560px',
				height: '420px',
				marginTop: '-210px',
				marginLeft: '-280px',
				border: '1px solid #ccc',
				background: '#fff',
				overflow: 'auto',
				WebkitOverflowScrolling: 'touch',
				borderRadius: '4px',
				outline: 'none',
				padding: '20px'
			}
		};
		var me = this;
		var itemsShop = me.state.list.map(function(item,index){
			var itemsDetail;
			var hours;
			var times;
			if(me.state.menu==1){
				itemsDetail = me.state.list[index].newests.map(function(itemIn,indexIn){
					hours=itemIn.updateTimestamp/1000/3600;
					if(hours>24){
						times=parseInt(hours/24)+'天';
					}
					else{
						times=parseInt(hours)+'小时';
					}
					return(
						<div key={indexIn} className="detail-r-m-list">
							<a>
								<img src={itemIn.imageUrl} />
							</a>
							<a>
								{itemIn.title}
							</a>
							<div className="oth-info">
								<p>&yen;{itemIn.price}</p>
								<p>{times}前</p>
							</div>
						</div>
					)
				})
			}
			else if(me.state.menu==2){
				itemsDetail = me.state.list[index].hot.map(function(itemIn,indexIn){
					hours=itemIn.updateTimestamp/1000/3600;
					if(hours>24){
						times=parseInt(hours/24)+'天';
					}
					else{
						times=hours+'小时';
					}
					return(
						<div key={indexIn} className="detail-r-m-list">
							<a>
								<img src={itemIn.imageUrl} />
							</a>
							<a>
								{itemIn.title}
							</a>
							<div className="oth-info">
								<p>&yen;{itemIn.price}</p>
								<p>{times}前</p>
							</div>
						</div>
					)
				})
			}
			return(
				<div key={index} className="buyer-focus-detail">
					<div className="detail-l">
						<div className="detail-l-t">
							<img src={item.storeLogo} />
							<span className="em"></span>{item.storeName}
						</div>	
						<div className="detail-l-m">
							<p>店铺主营 : 韩版女装</p>
							<p>{item.state} {item.city} {item.market} {item.floor} {item.stalls} </p>
							<p>
								<span></span>
								{item.phone}
							</p>
						</div>
						<div className="detail-l-b">
							<a onClick={me.openModal.bind(me,index)}><span className="icon-lajitong"></span>删除</a>
							<button>进店逛逛</button>
						</div>
					</div>
					<div className="detail-r">
						<div className="detail-r-t">
							<span>新品</span>
						</div>
						<div className="detail-r-m">
							{itemsDetail}
						</div>
					</div>
				</div>
			)
		})
		return (
			<div className="row">
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={mStyle} >

					<h3 ref="subtitle">提示</h3>
					<h3 ref="cont">确定要删除该宝贝吗？</h3>
					<div ref="caozuo">
						<button ref="close" onClick={this.closeModal}>关闭</button>
						<button ref="yes" onClick={this._del}>确定</button>
					</div>
				</Modal>
				<div className="col-md-2">
					<BuyerSide/>
				</div>
				<div className="col-md-10">
					<div className="buyer-focus">
						<div className="buyer-focus-location">
							当前位置：账号管理 > 关注店铺
						</div>

						<div className="buyer-focus-null" style={{display:this.state.list.length ? 'none' : 'block'}}>
							<div><img src="images/shoucang.png" /></div>
							<div>您还没有收藏商品，<a>快去逛逛吧</a></div>
						</div>
						<div className="buyer-focus-data" style={{display:this.state.list.length ? 'block' : 'none'}}>
							<div className="buyer-focus-menu">
								<a className={this.state.menu == 1 ? 'active' : ''} onClick={this._changeMenu.bind(this,1)}>全部店铺 10</a>
								<a className={this.state.menu == 2 ? 'active' : ''} onClick={this._changeMenu.bind(this,2)}>上新 5</a>
								<a style={{display:'none'}} className={this.state.menu == 3 ? 'active' : ''} onClick={this._changeMenu.bind(this,3)}>优惠 3</a>
							</div>
							<div className="buyer-focus-shop">
								<div className="shopinfo">店铺信息</div>
								<div className="shopdata">店铺动态</div>
								<select onChange={this._paixu}>
									<option value="1">收藏时间由新到旧</option>
									<option value="2">收藏时间由旧到新</option>
								</select>
							</div>
							{itemsShop}
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = BuyerFocus;