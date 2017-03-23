require('../../less/cart.less');
var React = require('react');
var Modal = require('react-modal');
var CartUtil = require('../utils/CartUtil.js');
var Cart = React.createClass({
    getInitialState: function() {
		return {
			modalIsOpen: false,
			isColle:[],
			cartItem: [],
			shopNum: -1,
			shoppingNum: -1,
			totleNum: 0,
			allTotal:0,
			checkedShopAll:[],
			checkedSelf: [],
			checkedAll:false,
			checkedListDel:[],
			checkedListCol:[],
			peisong:[]
        };
    },

	openModal: function(index, indexin,e) {
		var me=this;
		if(e.target.getAttribute('dir')=='delSelf'){
			me.setState({
				modalIsOpen: true,
				shopNum: index,
				shoppingNum: indexin
			});
		}
		else{
			this.setState({
				modalIsOpen: true,
				checkedListDel:(function(){
					for(var i=0;i<me.state.checkedSelf.length;i++){
						for(var j=0;j<me.state.checkedSelf[i].length;j++){
							if(me.state.checkedSelf[i][j]){
								me.state.checkedListDel.push(me.state.cartItem[i].combination[j].cardItemId)
							}
						}
					}
					return me.state.checkedListDel
				})()
			});
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
    componentDidMount: function() {
		var me = this;
		CartUtil.getData({}, function(res) {
			me.setState({
				cartItem:res.cartItem,
				isColle:(function(){
					for(var i=0;i<res.cartItem.length;i++){
						var isColle=[];
						for(var j=0;j<res.cartItem[i].combination.length;j++){
							isColle.push(res.cartItem[i].combination[j].product.collected)
						}
						me.state.isColle.push(isColle)
					}
					return me.state.isColle;
				})(),
				checkedShopAll:(function(){
					for(var i=0;i<res.cartItem.length;i++){
						me.state.checkedShopAll.push(false)
					}
					return me.state.checkedShopAll;
				})(),
				checkedSelf:(function(){
					var l=res.cartItem.length;
					for(var i=0;i<l;i++){
						var checkedSelf=[];
						for(var j=0;j<res.cartItem[i].combination.length;j++){
							checkedSelf[j]=false;
						}
						me.state.checkedSelf[i]=checkedSelf;
						
					}
					return me.state.checkedSelf;
				})(),
			})
		})
	},
	colle: function(index, indexin,e) {
		var me = this;
		var q=[];
		if(e.target.getAttribute('dir')=='colleSelf'){
			q = [me.state.cartItem[index].combination[indexin].product.productId];	
		}
		else{
			for(var i=0;i<me.state.checkedSelf.length;i++){
				for(var j=0;j<me.state.checkedSelf[i].length;j++){
					if(me.state.checkedSelf[i][j]){
						q.push(me.state.cartItem[i].combination[j].product.productId)
					}
				}
			}	
		}	
		CartUtil.colle(q, function() {
			me.setState({
				isColle:(function(){
					for(var i=0;i<q.length;i++){
						for(var j=0;j<me.state.cartItem.length;j++){
							for(var k=0;k<me.state.cartItem[j].combination.length;k++){
								if(q[i]==me.state.cartItem[j].combination[k].product.productId){
									me.state.isColle[j][k]=true;
								}
							}
						}
					}
					return me.state.isColle;
				})()
			})
		})	
		
	},
	changeChooseNum:function(index,indexin,e){
		var me=this;
		if(e.target.getAttribute('dir')==='-'){
			me.setState({
				cartItem:(function(){
					if(me.state.cartItem[index].combination[indexin].amount>0){
						var v=me.state.cartItem[index].combination[indexin].amount-1;
						me.state.cartItem[index].combination[indexin].amount=v;
					}	
					return me.state.cartItem;
				})()
			})
		}
		else if(e.target.getAttribute('dir')==='+'){		
			me.setState({
				cartItem:(function(){
					var v=me.state.cartItem[index].combination[indexin].amount+1;
					me.state.cartItem[index].combination[indexin].amount=v;					
					return me.state.cartItem;
				})()
			})	
	
		}
		else{
			var reg=/(^[1-9][0-9]*$)/;
			if(reg.test(e.target.value)){
				me.setState({
					cartItem:(function(){
						me.state.cartItem[index].combination[indexin].amount=e.target.value;					
						return me.state.cartItem;
					})()
				});
			}
			
		}
		var q=[{"itemId":me.state.cartItem[index].combination[indexin].cardItemId,"amount":me.state.cartItem[index].combination[indexin].amount}];
		CartUtil.updateItem(q,function(){

		})
	},
	checkedSelf:function(t1,t2,e){	
		var me=this;
		me.setState({
			checkedSelf:(function(){
				me.state.checkedSelf[t1][t2]=e.target.checked;
				return me.state.checkedSelf
			})()
		})
		for(var j=0; j<me.state.checkedSelf[t1].length;j++){
			if(!me.state.checkedSelf[t1][j]){
				break;
			}
		}
		if(j==me.state.checkedSelf[t1].length){
			me.setState({
				checkedShopAll:(function(){
					me.state.checkedShopAll[t1]=true;
					return me.state.checkedShopAll
				})()
			})
		}
		else{
			me.setState({
				checkedShopAll:(function(){
					me.state.checkedShopAll[t1]=false;
					return me.state.checkedShopAll
				})()
			})
		}
		for(var i=0;i<me.state.checkedShopAll.length;i++){
			if(!me.state.checkedShopAll[i]){
				break;
			}
		}
		if(i==me.state.checkedShopAll.length){
			me.setState({
				checkAll:(function(){
					me.state.checkedAll=true;
					return me.state.checkedAll
				})()
			})
		}
		else{
			me.setState({
				checkAll:(function(){
					me.state.checkedAll=false;
					return me.state.checkedAll
				})()
			})
		}
		me.total();
	},
	checkedShopAll:function(t,e){
		var me =this;
		me.setState({
			checkedShopAll:(function(){
				me.state.checkedShopAll[t]=e.target.checked;
				return me.state.checkedShopAll
			})(),
			checkedSelf:(function(){
				for(var i=0;i<me.state.checkedSelf[t].length;i++){
					me.state.checkedSelf[t][i]=e.target.checked;	
				}
				return me.state.checkedSelf
			})()
		})
		for(var i=0;i<me.state.checkedShopAll.length;i++){
			if(!me.state.checkedShopAll[i]){
				break;
			}
		}
		if(i==me.state.checkedShopAll.length){
			me.setState({
				checkAll:(function(){
					me.state.checkedAll=true;
					return me.state.checkedAll
				})()
			})
		}
		else{
			me.setState({
				checkAll:(function(){
					me.state.checkedAll=false;
					return me.state.checkedAll
				})()
			})
		}
		me.total();
	},
	checkedAll:function(e){
		var me=this;
		me.setState({
			checkedAll:e.target.checked,
			checkedSelf:(function(){
				for(var i=0;i<me.state.checkedSelf.length;i++){
					for(var j=0;j<me.state.checkedSelf[i].length;j++){
						me.state.checkedSelf[i][j]=e.target.checked;
					}
				}
				return me.state.checkedSelf;
			})(),
			checkedShopAll:(function(){
				for(var i=0;i<me.state.checkedShopAll.length;i++){
					me.state.checkedShopAll[i]=e.target.checked
				}
				return me.state.checkedShopAll;
			})()
		})
		me.total();
	},
	total:function(){
		var me = this;
		var totleNum=0;
		var allTotal=0;
		me.setState({
			totleNum:(function(){
				for(var i=0;i<me.state.checkedSelf.length;i++){
					for(var j=0;j<me.state.checkedSelf[i].length;j++){
						if(me.state.checkedSelf[i][j]){
							totleNum+=1;
						}
					}
				}
				me.state.totleNum = totleNum;
				return me.state.totleNum;
			})(),
			allTotal:(function(){
				for(var i=0;i<me.state.checkedSelf.length;i++){
					for(var j=0;j<me.state.checkedSelf[i].length;j++){
						if(me.state.checkedSelf[i][j]){
							allTotal+=me.state.cartItem[i].combination[j].amount*me.state.cartItem[i].combination[j].skuPrice;
						}
					}
				}
				me.state.allTotal = allTotal;
				return me.state.allTotal;
			})()
		})
	},
	del:function(){
		var me = this;
		me.closeModal();
		if(me.state.shopNum !=-1 && me.state.shoppingNum!=-1){
			var q = {itemId:me.state.cartItem[me.state.shopNum].combination[me.state.shoppingNum].cardItemId};
			CartUtil.deleteItem(q, function() {
				
			})
		}
		else{
			var q=[];
			for(var i=0;i<me.state.checkedListDel.length;i++){
				q[i]={itemId:me.state.checkedListDel[i]}
			}
			CartUtil.delChecked(q,function(){
				
			})
		}
		window.location.reload();
		
    },
    deleteDisable:function(){
		CartUtil.deleteDisable(function(){
   			window.location.reload();
		})
    },
	_peisong: function(t, e) {
		var me = this;
		me.setState({
			peisong: (function() {
				me.state.peisong[t] = e.target.value;
				return me.state.peisong;
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
		var me=this;
		var itemsCartItem=this.state.cartItem.map(function(item,index){	
			var itemsCombination =item.combination.map(function(itemin,indexin){
				var spec = Object.keys(itemin.specificationValue).map(function(key) {
					return itemin.specificationValue[key];
				}, this).join('/');
				var ss='';
				var showPrice='';
				if(!itemin.product.isSkuPrice){
					var newPrice=itemin.product.price;
					var newRange=itemin.product.range;	
					var showRange=[];
					var num=itemin.amount;
					for(var i=0;i<newRange.length;i++){
						if(num>=newRange[i] && num<newRange[i+1]){
							showRange[0]=newRange[i+1];
							showRange[1]=newRange[i];
							showPrice=newPrice[0];
						}
						else if(num>=newRange[newRange.length-1]){				
							showRange[0]=newRange[newRange.length-1];
							showPrice=newPrice[i];													
						}
						else if(num==0){
							showRange[0]='未选择该商品';
							showPrice=newPrice[0];
						}

					}
					
					if(showRange.length>1){
						ss=showRange[1]+'件-'+showRange[0]+'件：';
					}
					else if(showRange[0]!='未选择该商品'){
						ss=showRange[0]+'件以上：'
					}
					else{
						ss='';
					}
					
				}
				else{
					showPrice=itemin.skuPrice;
				}
				var selTotal=parseFloat(showPrice)*itemin.amount;
				
				return ( 
					<div className = "cart-shop-shopping" key = {indexin}>					
						<div className="cart-shop-shopping-detail">
							<div className="cart-shop-shopping-detail-l col-md-4">
								<input type="checkbox" onChange={me.checkedSelf.bind(me,index,indexin)} checked={me.state.checkedSelf[index][indexin] || ''}/>
								<img src={itemin.product.productImage}/>
								<a href="#">
									{itemin.product.title}
								</a>
							</div>
							<div className="cart-shop-shopping-detail-c col-md-4">
								<div>{spec}</div>
								<div>
									<div>
										<div dir="-" onClick={me.changeChooseNum.bind(me,index,indexin)}>-</div>
										<input type="text" value={itemin.amount} onChange={me.changeChooseNum.bind(me,index,indexin)}/>
										<div dir="+" onClick={me.changeChooseNum.bind(me,index,indexin)}>+</div>
									</div>
									<div>{ss}{showPrice}/件</div>										
								</div>
							</div>
							<div className="cart-shop-shopping-detail-r col-md-4">
								<div>
									<p>&yen;{showPrice}</p>
								</div>
								<div>
									&yen;{selTotal}
								</div>
								<div>
									<a onClick={me.openModal.bind(me,index,indexin)} dir="delSelf">删除</a>
									<span>|</span>
									<a onClick={me.colle.bind(me,index,indexin)} dir='colleSelf'>{me.state.isColle[index][indexin] ? '已收藏':'收藏'}</a>							
								</div>
							</div>
						</div>
					</div>
				)							
			})		
			return(
				<div className="cart-shop" key={index}>
					<div className="cart-shop-name">
						<input type="checkbox" checked={me.state.checkedShopAll[index] || ''} onChange={me.checkedShopAll.bind(me,index)}/>
						<a href="#">{item.store.store}</a>&nbsp;&nbsp;
						{item.storeProfile.phone}
					</div>
					<div>
						{itemsCombination}
						<div className="cart-shop-send">
							<div>配送服务：</div>
							<div>
								<label>代发</label>
								<input type="radio" value={1} name={'peisong'+index} onChange={me._peisong.bind(me,index)} />
							</div>
							<div>
								<label>自提</label>
								<input type="radio" value={2} name={'peisong'+index} onChange={me._peisong.bind(me,index)} />
							</div>
							<div>
								<label>商家发货</label>
								<input type="radio" value={3} name={'peisong'+index} onChange={me._peisong.bind(me,index)} />
							</div>
						</div>
					</div>
				</div>
			)

		})
		return (
			<div className="row">
				<div className="col-md-12">
					<div>
						<Modal
							isOpen={this.state.modalIsOpen}
							onAfterOpen={this.afterOpenModal}
							onRequestClose={this.closeModal}
							style={mStyle} >

							<h3 ref="subtitle">提示</h3>
							<h3 ref="cont">确定要删除该宝贝吗？</h3>
							<div ref="caozuo">
								<button ref="close" onClick={this.closeModal}>关闭</button>
								<button ref="yes" onClick={this.del}>确定</button>
							</div>
						</Modal>
					</div>

					<div className="cart">
						<div>
							<ul className="cart-menu-l col-md-4">
								<li>
									<input type="checkbox" onChange={me.checkedAll} checked={me.state.checkedAll || ''}/>全选
								</li>
								<li>
									商品
								</li>
							</ul>
							<ul className="cart-menu-c col-md-4">
								<li>
									规格
								</li>
								<li>
									数量
								</li>						
							</ul>
							<ul className="cart-menu-r col-md-4">
								<li>
									单价
								</li>
								<li>
									小计
								</li>
								<li>
									操作
								</li>
							</ul>
						</div>

						{itemsCartItem}

						<div className="cart-caozuo">
							<div className="cart-caozuo-l">
								<ul>
									<li>
										<input type="checkbox" onChange={me.checkedAll} checked={me.state.checkedAll || ''}/>全选
									</li>
									<li>
										<a onClick={me.openModal}>删除</a>
									</li>
									<li>
										<a onClick={me.colle}>收藏</a>
									</li>
									<li>
										<a onClick={me.deleteDisable}>清空失效商品</a>
									</li>
								</ul>			
							</div>
							<div className="cart-caozuo-r">
								<div>
									商品数量：{this.state.totleNum}件
								</div>
								<div>
									金额总计（不含运费）：
									<span>&yen;{this.state.allTotal}</span>
								</div>

								<div>
									<button>结算</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			);
	}
});

module.exports = Cart;