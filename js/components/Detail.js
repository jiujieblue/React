require('../../less/detail.less');
var React = require('react');
var DetailUtil=require('../utils/DetailUtil.js');
var Detail = React.createClass({
	getInitialState:function(){
		return{
			res:[],
			productId:'',
			storeId:'',
			featureString:[],
			resSide:[],
			page:1,
			show_type:0,
			color_t:-1,
			size_t:-1,
			logoUrl:null,
			store:'',
			productNum:[],
			phone:[],
			place:[],
			show:[],
			tit:[],
			price:[],
			range:[],
			colorDef:[],
			sizeDef:[],
			combination:[],
			combinationId:'',
			kucun:[],
			inputVal:0,
			location:[],
			costDef:[],
			fav:[],
			star:[],
			getSideData:[],
			newList:[],
			font:[],
			chooseColor:'',
			chooseSize:'',
			chooseList:[],
			blk:0,
			list_t:1
		}
	},
	componentDidMount: function() {
		var q=this.props.location.query;
		DetailUtil.myDetail(q,function(res) {
			var r = res.storeProfileForm.storeProfile;
			this.setState({
				res:res,
				featureString:res.featureArray,
				show_type:0,
				logoUrl:r.logoUrl,
				store:res.storeProfileForm.store.store,
				productNum:res.storeProfileForm.productNum,
				phone:r.phone,
				place:r.state+r.city+r.region+r.market+r.floor+r.stalls,
				show:res.carousel,
				tit:res.tit,
				price:(function(){
					if(res.isSkuPrice){
						return [res.minSkuPrice];
					}
					else{					
						return res.price;
					}
					
				})(),
				range:res.range,
				colorDef:res.combination,
				sizeDef:res.combination[0].child,
				combination:res.combination,
				kucun:res.totalAmount,
				location:r.location,
				costDef:res.shippingCost,
				fav:res.storeProfileForm.favorited,
				star:res.star,
			});
			var ff=null;
			if(this.state.fav){
				ff = '已收藏';
				this.setState({
					font:ff,
				})
			}
			else{
				ff = '收藏';
				this.setState({
					font:ff,
				})
			}
			var side={
				storeId:this.state.res.storeId,
				productId:this.state.res.productId,
				page:this.state.page
			}
			DetailUtil.getSide(side, function(res) {
				this.setState({
					resSide:res,
					getSideData:res.list
				})
			}.bind(this));

			DetailUtil.getNew(q, function(res) {
				this.setState({
					newList:res
				})
			}.bind(this));
			
		}.bind(this));

	},
	show:function(t){
		this.setState({
			show_type:t,
		})
	},
	color_border:function(t){
		this.setState({
			color_t:t,
			inputVal:0
		});

	},
	size_border:function(t){
		this.setState({
			size_t:t,
			inputVal:0
		});
	},
	changeNum:function(e){
		if(e.target.getAttribute('dir')==='-'){
			if(this.state.inputVal>0){
				this.setState({
					inputVal:--this.state.inputVal
				})
			}
		}
		else if(e.target.getAttribute('dir')==='+'){
			this.setState({
				inputVal:++this.state.inputVal
			})
		}
		else{
			var reg=/^[1-9][0-9]*$/;
			if(reg.test(e.target.value)){
				this.setState({
					inputVal:e.target.value
				});
			}			
		}
		if(this.state.color_t != -1 && this.state.size_t != -1){
			if(!this.state.chooseList.length){
				this.state.chooseList.push([this.state.chooseColor,this.state.chooseSize,this.state.inputVal,this.state.res.combination[this.state.color_t].child[this.state.size_t].combinationId]);
			}
			else{
				for(var i=0;i<this.state.chooseList.length;i++){
					if(this.state.chooseList[i][0]==this.state.chooseColor && this.state.chooseList[i][1]==this.state.chooseSize){
						this.state.chooseList[i][2]=this.state.inputVal
						return
					}
				}
				if(i==this.state.chooseList.length){
					this.state.chooseList.push([this.state.chooseColor,this.state.chooseSize,this.state.inputVal,this.state.res.combination[this.state.color_t].child[this.state.size_t].combinationId]);
				}
			}
		}		
	},
	cancelColl:function(){
		if(this.state.fav){
			this.setState({
				fav:false,
				font:'收藏'
			})
		}
		else{
			this.setState({
				fav:true,
				font:'已收藏'
			})
		}
		
	},
	changeChooseNum:function(t,e){
		var me=this;
		if(e.target.getAttribute('dir')==='-'){
			me.setState({
				chooseList:(function(){
					if(me.state.chooseList[t][2]>0){
						var i=me.state.chooseList[t][2]-1;
						me.state.chooseList[t][2]=i;
					}							
					return me.state.chooseList;
				})()
			})
		}
		else if(e.target.getAttribute('dir')==='+'){			
			me.setState({
				chooseList:(function(){
					var i=me.state.chooseList[t][2]+1;
					me.state.chooseList[t][2]=i;
					return me.state.chooseList;
				})()
			})		
		}
		else{
			var reg=/(^[1-9][0-9]*$)|(\s*)/;
			if(reg.test(e.target.value)){
				me.setState({
				chooseList:(function(){
						me.state.chooseList[t][2]=e.target.value;
						return me.state.chooseList;
					})()
				});
			}


		}
	},
	showChoose:function(){
		if(this.state.blk){
			this.setState({
				blk:0
			})
		}
		else{
			this.setState({
				blk:1
			})
		}
	},
	changePage:function(e){
		var me=this;
		var side=null;
		if(e.target.getAttribute('dir')==='+'){
			if(me.state.resSide.hasNextPage){
				me.setState({
					page:++me.state.page
				})
				side={
					storeId:me.state.res.storeId,
					productId:me.state.res.productId,
					page:me.state.page
				}
				DetailUtil.getSide(side, function(res) {
					me.setState({
						resSide:res,
						getSideData:res.list
					})
				});
			}
		}
		if(e.target.getAttribute('dir')==='-'){
			if(me.state.page>1){
				me.setState({
					page:--me.state.page
				})
				side={
					storeId:me.state.res.storeId,
					productId:me.state.res.productId,
					page:me.state.page
				}
				DetailUtil.getSide(side, function(res) {
					me.setState({
						resSide:res,
						getSideData:res.list
					})
				});
			}
		}
		

		
	},
	changeList:function(t1,t2){
		this.setState({
			list_t:t2
		})
		if(t1){
			var height = $('.del-list').offset().top;
			document.documentElement.scrollTop=height;
			document.body.scrollTop=height;
				
		}
	},
	addToCart:function(){
		var me=this;
		var data={
			storeId:me.state.res.storeId,
			productId:me.state.res.productId,
			combination:(function(){
				var arr=[];
				for(var i=0;i<me.state.chooseList.length;i++){
					arr[i]={'combinationId':me.state.chooseList[i][3],'getamount':me.state.chooseList[i][2]}
				}
				return arr;
			})()
		}


		DetailUtil.addToCart(data,function(){

		})
	},
	render: function () {	
			window.onscroll=function(){
				var top = document.documentElement.scrollTop||document.body.scrollTop;
				var height = $('.del-list').offset().top;
				if(top>=height){
					$('.fixed').css('display','block');
				}
				else{
					$('.fixed').css('display','none');
				}
			}
			
		
		
		var itemsShow = this.state.show.map(function(item,index){
			return(
				<img key={index} src={item} onMouseMove={this.show.bind(this,index)}/>
			)
		},this);
		var itemsColor=this.state.colorDef.map(function(item,index){
			return(
				<img key={index} src={item.image} title={item.name} onClick={this.color_border.bind(this,index)} className={this.state.color_t===index?'_border':''}/>
			)
		},this);
		var itemsSize=this.state.sizeDef.map(function(item,index){
			return(
				<div key={index} onClick={this.size_border.bind(this,index)} className={this.state.size_t===index?'_border':''}>{item.name}</div>
			)
		},this);
		var itemsSide=this.state.getSideData.map(function(item,index){
			return(
				<div key={index} className="detail-side-show">
					<a href="#">
						<img src={item.imageUrl}/>
					</a>
					<div>
						&yen; {item.price}
					</div>
				</div>
			)
		});
		var itemsNew=this.state.newList.map(function(item,index){
			return(
				<div key={index}>
					<a href="#">
						<img src={item.imageUrl}/>
					</a>
					<a href="#">{item.title}</a>
					<span>&yen; {item.price}</span><span>数据</span>
				</div>
			)
		});
		var l=this.state.price.length;
		var itemsPrice=this.state.price.map(function(item,index){
			if(l==1){
				return (
					<div key={index}>
						<h3>&yen; {item}</h3>
					</div>
				)
			}
			else{
				for(var i=0;i<l;i++){
					return(
						<div key={index}>
					 		<h3>&yen; {item}</h3>
							<p>{this.state.range[index]}件{this.state.range[index+1]-1 ? '-'+(this.state.range[index+1]-1) + '件': '以上' }</p>
					 	</div>
					)
				}
				
			}
			
		}.bind(this));
		var me=this;
		var itemsChooseList=this.state.chooseList.map(function(item,index){
			return(
				<div key={index}>
					<div>{item[0]}</div>
					<div>{item[1]}</div>
					<div>数量：</div>
					<div>					
						<div dir="-" onClick={me.changeChooseNum.bind(me,index)}>-</div>
						<input type="text" value={item[2]} onChange={me.changeChooseNum.bind(me,index)}/>
						<div dir="+" onClick={me.changeChooseNum.bind(me,index)}>+</div>					
					</div>
				</div>
			)
		});
		var itemsTable=this.state.featureString.map(function(item,index){
			return(
				<tr key={index}>
					<td>{item[0][0]} ： {item[0][1]}</td>
					<td>{item[1][0]==null ? '' : item[1][0]+' ： '+item[1][1]}</td>
					<td>{item[2][0]==null ? '' : item[2][0]+' ： '+item[2][1]}</td>
				</tr>
			)
		});
		var myStock = null;
		if (this.state.color_t !== -1 && this.state.size_t !== -1) {
			myStock = this.state.combination[this.state.color_t].child[this.state.size_t].amount;
			// this.setState({
			// 	price:[this.state.combination[this.state.color_t].child[this.state.size_t].price]
			// });
			// this.state.price=[this.state.combination[this.state.color_t].child[this.state.size_t].price];
			this.state.chooseColor=this.state.combination[this.state.color_t].name;
			this.state.chooseSize=this.state.combination[this.state.color_t].child[this.state.size_t].name;
		}
		else {
			myStock = this.state.kucun;
		}
		return (
			<div className="row detail-detail-box">
				<div>
					<div className="col-md-10">
						<div className="detail">
							<div className="detail-shop">
								<div className="detail-shop-name">
									<div>
										<img src={this.state.logoUrl}/>
									</div>
									<div>
										<h3>{this.state.store}</h3>
										<p>本店{this.state.productNum}件商品</p>
									</div>
								</div>
								<div className="detail-shop-add">
									<p>{this.state.phone}</p>
									<p>{this.state.place}</p>
								</div>
							</div>

							<div className="detail-shopping">
								<div className="detail-shopping-img">
									<div>
										<img src={this.state.show[this.state.show_type]}/>	
									</div>
									<div>
										{itemsShow}
									</div>
								</div>
								<div className="detail-shopping-order">
									<div className="detail-shopping-order-title">
										{this.state.tit}
									</div>
									<div className="detail-shopping-order-num">
										{itemsPrice}
									</div>
									<div className="detail-shopping-order-addr" style={{display:'none'}}>
										<div>配送：{this.state.location}至</div>
										<div>
											<select>
												<option>四川成都</option>
												<option>广东深圳</option>
											</select>
										</div>
										<div>
											<select>
											<option>快递：&yen;{this.state.costDef}</option>
											<option>EMS：&yen;{this.state.costDef}</option>
											</select>
										</div>
									</div>
									<div className="detail-shopping-order-style">
										<div className="detail-shopping-order-style-color">
											<div>颜色：</div>
											{itemsColor}
										</div>
										<div className="detail-shopping-order-style-size">
											<div>尺码：</div>
											{itemsSize}
										</div>
										<div className="detail-shopping-order-style-num">
											<div style={{display:'none'}}>数量：</div>
											<div>
												<div dir="-" onClick={this.changeNum}>-</div>
												<input type="text" value={this.state.inputVal} onChange={this.changeNum}/>
												<div dir="+" onClick={this.changeNum}>+</div>		
											</div>
											<div>(库存{myStock}件)</div>
										</div>
									</div>
									<div className="detail-shopping-order-caozuo">
										<button onClick={this.addToCart}>
											加入进货单
										</button>
										<button>
											立即购买
										</button>
									</div>
									<div className="detail-shopping-order-share">
										<a onClick={this.cancelColl}>
											<span className={'icon-shoucang' + (this.state.fav ? ' _fav':'')}></span>
											&nbsp;{this.state.font}
										</a>
										<span style={{display:'none'}}>
											（人气：{this.state.star}）
										</span>
										<div>
											<a>
												<span className="icon-fenxiang">&nbsp;分享</span>
											</a>
											<a>
												<img src="../images/icons/tencent.png"/>
											</a>
											<a>
												<img src="../images/icons/xinlang.png"/>
											</a>
										</div>
									</div>
									<div className="detail-shopping-order-service">
										<span>卖家服务：</span>
										<span>实拍认证</span>
										<span>准时发货</span>
									</div>
									<div className="detail-shopping-order-cho" style={{display:'none'}}>
										<div className={this.state.blk==0 ? '' : 'block'}>
											{this.state.chooseList.length==0 ? '您还未添加商品！' : itemsChooseList}
											<div className={this.state.chooseList.length==0 ? '' : '_block'}>
												共计{this.state.chooseList.length}件：&nbsp;
												<span>&yen;100000.00</span>
											</div>
										</div>
										<a onClick={this.showChoose}>已选清单（共<span>{this.state.chooseList.length}</span>件）</a>						
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="detail-side col-md-2">
						<div className="detail-side-name">
							<span className="icon-bendiantuijian"></span>
							<h3>本店推荐</h3>
						</div>
						{itemsSide}
						<div className="detail-side-fanye">
							<span className={this.state.page>1 ? 'icon-fanyeup active' : 'icon-fanyeup'} dir='-' onClick={this.changePage}></span>
							<span className={this.state.resSide.hasNextPage ? 'icon-fanyedown active' : 'icon-fanyedown'} dir='+' onClick={this.changePage}></span>
						</div>
					</div>
				</div>
				<div className="detail-new col-md-12">
					<div className="detail-new-tit">
						<div>最新上架</div>
						<div><a href="#"><span className="icon-more"></span></a></div>
					</div>
					<div className="detail-new-list">
						{itemsNew}
					</div>
				</div>

				<div className="detail-del col-md-12">
					<div className="fixed">
						<div className="container">
							<div className="row">
								<ul className="del-list-b">
									<li className={this.state.list_t === 1 ? 'delactive' : ''} onClick={this.changeList.bind(this,1,1)}>商品详情</li>
									<li className={this.state.list_t === 2 ? 'delactive' : ''} onClick={this.changeList.bind(this,1,2)} style={{display:'none'}}>用户评论</li>
								</ul>
								<button onClick={this.addToCart}>
									加入进货单
								</button>
							</div>
						</div>
						
					</div>
					<ul className="del-list">
						<li className={this.state.list_t === 1 ? 'delactive' : ''} onClick={this.changeList.bind(this,0,1)}>商品详情</li>
						<li className={this.state.list_t === 2 ? 'delactive' : ''} onClick={this.changeList.bind(this,0,2)} style={{display:'none'}}>用户评论</li>
					</ul>
					<div className="detail-del-data" style={{display:this.state.list_t==1?'block':'none'}}>
						<div className="detail-del-data-tit">
							<div></div>
							<div>
								规格参数
							</div>
							<div></div>
						</div>
						<table>
							<tbody>
								{itemsTable}
							</tbody>
						</table>
						<div className="detail-del-data-img">
							<div></div>
							<div>
								图文详情
							</div>
							<div></div>
							<div dangerouslySetInnerHTML={{__html: this.state.res.description}} />

						</div>					
					</div>

					<div className="detail-del-pinglun" style={{display:this.state.list_t==2?'block':'none'}}>
						<h2>我是评论</h2>
					</div>
				</div>			
			</div>
		);
	}
});

module.exports = Detail;