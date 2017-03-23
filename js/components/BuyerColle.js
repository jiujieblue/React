require('../../less/buyer-colle.less');
var React = require('react');
var BuyerSide = require('./BuyerSide.js');
var Modal = require('react-modal');
var BuyerColleUtil = require('../utils/BuyerColleUtil.js');
var BuyerColle = React.createClass({
	getInitialState:function(){
		return{
			modalIsOpen: false,
			menu:1,
			isPiliang:false,
			isChecked:[],
			isAll:false,
			data:[]
		}
	},
	componentDidMount:function(){
		var me = this;
		BuyerColleUtil.getData(function(res){
			me.setState({
				data:res.favouriteProducts,
				isChecked:(function(){
					for(var i=0;i<res.favouriteProducts.length;i++){
						me.state.isChecked[i]=false;
					}
					return me.state.isChecked
				})()
			})
		})
	},
	openModal: function() {
		var me=this;
		for(var i=0;i<me.state.isChecked.length;i++){
			if(me.state.isChecked[i]){
				me.setState({
					modalIsOpen: true,
				});
				break;
			}
		}
		
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
    closeModal: function() {
      this.setState({modalIsOpen: false});
    },
	_menu:function(t){
		var me = this;
		me.setState({
			menu:t
		})
	},
	_delshixiao:function(){
		BuyerColleUtil.delshixiao(function(){
			window.location.reload();
		})
	},
	_piliang:function(){
		if(this.state.isPiliang){
			this.setState({
				isPiliang:false,
				isChecked:[]
			})
		}
		else{
			this.setState({
				isPiliang:true
			})
		}
	},
	_checked:function(t){
		var me = this;
		if(me.state.isPiliang){
			me.setState({
				isChecked:(function(){
					me.state.isChecked[t]=!me.state.isChecked[t];
					return me.state.isChecked;
				})()
			})
		}
		me.setState({
			isAll:(function(){
				for(var i=0;i<me.state.isChecked.length;i++){
					if(!me.state.isChecked[i]){
						return false;
					}
				}
				return true
			})()
		})
		
	},
	_checkAll:function(e){
		var me = this;
		me.setState({
			isAll:e.target.checked,
			isChecked:(function(){
				for(var i=0;i<me.state.isChecked.length;i++){
					me.state.isChecked[i]=e.target.checked;
				}
				return me.state.isChecked;
			})()
		})
		
	},
	_del:function(){
		var me = this;
		me.closeModal();
		if(me.state.isAll){
			BuyerColleUtil.del({isAll: me.state.isAll}, function(res) {
				window.location.reload();
			})
		}
		else{
			var deleteIds=[];
			for(var i=0;i<me.state.isChecked.length;i++){
				if(me.state.isChecked[i]){
					deleteIds.push(me.state.data[i].productId)
				}
			}
			if(deleteIds.length){
				BuyerColleUtil.del({deleteIds: deleteIds}, function(res) {
					window.location.reload();
				})
			}
			
		}
		
	},
	_over:function(t,e){
		var me = this;
		if(me.state.isPiliang){
			if(e.target.nodeName == 'IMG' || e.target.nodeName == 'B'){
				e.target=$(e.target).parent()[0];
			}
			if(e.target.nodeName == 'SPAN'){
				e.target=$(e.target).parent().parent()[0];
			}
			$(e.target).css('border','2px solid #fcc505');
			if(!me.state.isChecked[t]){
				$(e.target).children( '.icon-shubiaoyiru').css('color','#fcc505');
			}
			
		}
		$('.icon-shubiaoyiru').css('border','none');
		$('.icon-xuanzhong').css('border','none');
		if(!me.state.isPiliang){
			$(e.target).css('opacity','0.5');
		}
	},
	_out:function(t,e){
		var me = this;
		if(me.state.isPiliang){
			if(e.target.nodeName == 'IMG' || e.target.nodeName == 'B'){
				e.target=$(e.target).parent();
			}
			if(e.target.nodeName == 'SPAN'){
				e.target=$(e.target).parent().parent()[0];
			}
			$(e.target).children('.icon-shubiaoyiru').css('color','#ddd');
			if(me.state.isChecked[t]){
				$(e.target).css('border','2px solid #fcc505');
			}
			else{
				$(e.target).css('border','2px solid #ddd');
			}
		}
		$('.icon-shubiaoyiru').css('border','none');
		$('.icon-xuanzhong').css('border','none');
		if(!me.state.isPiliang){
			$(e.target).css('opacity','1');
		}
	},
	render: function () {
		var me = this;
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
		var isInvalid=0;
		var itemsData = me.state.data.map(function(item,index){
			if(item.invalid){
				isInvalid+=1;
				console.log(1)
			}
			return(
				<div className="list-detail" key={index}>
					<div className={me.state.isChecked[index] ? 'list-detail-img active' : 'list-detail-img'} onMouseOver={me._over.bind(me,index)} onMouseOut={me._out.bind(me,index)}>
						<img src={item.imageUrl} onClick={me._checked.bind(me,index)}/>
						<b style={{display:me.state.isPiliang ? 'block' : 'none'}} className={me.state.isChecked[index] ? 'icon-xuanzhong' : 'icon-shubiaoyiru'}>
							<span className="path1"></span>
							<span className="path2"></span>
						</b>
					</div>							
					<a>{item.title}</a>
					<div className="list-detail-oth">
						<p>&yen; {item.price}</p>
						<a>
							<span className="icon-dianpu" title="去他的店"></span>
						</a>
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
					<BuyerSide />
				</div>
				<div className="col-md-10">
					<div className="buyer-colle">
						<div className="buyer-colle-location">
							当前位置：账号管理 > 收藏商品
						</div>

						<div className="buyer-colle-null" style={{display:this.state.data.length ? 'none' : 'block'}}>
							<div><img src="images/dianpu.png" /></div>
							<div>没有任何关注店铺，<a>快去逛逛吧</a></div>
						</div>

						<div className="buyer-colle-data" style={{display:this.state.data.length ? 'block' : 'none'}}>
							<div className="buyer-colle-menu">
								<ul>
									<li onClick={this._menu.bind(this,1)} className={this.state.menu == 1 ? 'active' : ''}>全部<span>{this.state.data.length}</span></li>
									<li onClick={this._menu.bind(this,2)} className={this.state.menu == 2 ? 'active' : ''}>免邮<span>12</span></li>
									<li onClick={this._menu.bind(this,3)} className={this.state.menu == 3 ? 'active' : ''}>优惠<span>10</span></li>
									<li onClick={this._menu.bind(this,4)} className={this.state.menu == 4 ? 'active' : ''}>上架时间<span className="icon-xiajiang"></span></li>
									<li onClick={this._menu.bind(this,5)} className={this.state.menu == 5 ? 'active' : ''}>上架时间<span className="icon-shangshen"></span></li>
								</ul>
							</div>
							<div className="buyer-colle-caozuo">
								<p>您有<span>{isInvalid}</span>个失效商品</p>
								<a onClick={this._delshixiao}>全部删除</a>
								<div className="caozuo-box">
									<div style={{display:this.state.isPiliang ? 'block' : 'none'}}>
										<input id="all" type="checkbox" onChange={this._checkAll} checked={this.state.isAll || ''}/><label htmlFor="all">全选</label>
										<a onClick={this.openModal}><span className="icon-lajitong"></span>删除</a>
									</div>							
									<a onClick={this._piliang}>{this.state.isPiliang ? '取消管理':'批量删除'}</a>
								</div>
								
							</div>
							<div className="buyer-colle-list">
								{itemsData}										
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = BuyerColle;