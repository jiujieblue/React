require('../../less/market-info.less');
require('isomorphic-fetch');
var React = require('react');
var MarketInfoUtil = require('../utils/MarketInfoUtil.js');
var fto = require('form_to_object');
var ErrorMsg = require('./ErrorMsg.js');
var Modal = require('react-modal');
var SellerSide = require('./SellerSide.js');


var MarketInfo = React.createClass({
	getInitialState:function(){
		return{
			error:'',
			data:'',
			store: '',
			phone: '',
			stalls: '',
			categories:'',
			selValue:'',
			modalIsOpen: false,
			image:'',
			imageUrl:''
		}
	},

	componentWillMount:function(){
		var me=this;
		MarketInfoUtil.getData(function(res){
			me.setState({
				data: res.storeProfile,
				store: res.storeProfile.store,
				phone: res.storeProfile.phone,
				stalls: res.storeProfile.stalls,
				categories: res.categories,
				image: res.storeProfile.avatarUrl
			})
		});
	},
	handleStoreChange: function(e){
		this.setState({
			store: e.target.value
		});
	},

	handlePhoneChange:function(e){
		this.setState({
			phone: e.target.value
		});
	},

	handleStallsChange:function(e){
		this.setState({
			stalls: e.target.value
		});
	},

	handlePhoneBlur:function(e){
		var reg=/^1[358]\d{9}$/;
		if(!e.target.value){
			this.setState({
				error:'电话号码不能为空！'
			})
			return false;
		}else if(!reg.test(e.target.value)){
			this.setState({
				error:'电话号码不正确，请重新输入！'
			})
			return false;
		}else{
			this.setState({
				error:''
			})
			return true;
		}
	},

	handleLabelClick:function(e){
		var ele=this.refs[e.target.getAttribute("data")];
		ele.checked?ele.checked=false:ele.checked=true;
	},

	handlecategoryChange:function(e){
		this.setState({
			selValue:e.target.value
		});
	},

	closeModal:function(e){
		this.setState({
			modalIsOpen: false
		});
		if(e.target.getAttribute('dir')){
			this.refs.f.click();
		}
	},
	handleOpenClick:function(){
		this.setState({
			modalIsOpen: true
		});
	},

	afterOpenModal: function() {
    // references are now sync'd and can be accessed.
      this.refs.subtitle.style.color = '#fcc506';
      this.refs.subtitle.style.borderBottom = '2px solid #fcc506';
      this.refs.subtitle.style.paddingBottom = '15px';
      this.refs.close.style.display = 'block';
      this.refs.close.style.width = '210px';
      this.refs.close.style.height = '58px';
      this.refs.close.style.border = '1px solid #ddd';
      this.refs.close.style.borderRadius = '5px';      
      this.refs.close.style.background = '#fcc505';  
      this.refs.close.style.marginLeft = '150px'; 
      this.refs.close.style.marginTop = '30px';   
      this.refs.yes.style.display = 'block';
      this.refs.yes.style.width = '210px';
      this.refs.yes.style.height = '58px';
      this.refs.yes.style.border = '1px solid #ddd';
      this.refs.yes.style.borderRadius = '5px';      
      this.refs.yes.style.background = '#fff'; 
      this.refs.yes.style.marginLeft = '150px';     
      this.refs.yes.style.marginTop = '50px';   
      this.refs.xuanze.style.fontSize = '24px';
      this.refs.xuanze.style.marginRight = '5px';
      this.refs.paishe.style.fontSize = '24px';
      this.refs.paishe.style.marginRight = '5px';
    },

	_submit:function(e){
		e.preventDefault();
		var reg=/^1[358]\d{9}$/;
		//var submitData = fto(e.target);
		var submitData = new FormData(this.refs.form);
		submitData.append('shopkeeper',this.state.data.shopkeeper);
		submitData.append('storeId',this.state.data.storeId);
		submitData.append('location',this.state.data.location);
		if(this.state.imageUrl){
			submitData.append('avatar',this.state.imageUrl);
		}
		if(!e.target.phone.value){
			this.setState({
				error:'电话号码不能为空！'
			})
			return false;
		}else if(!reg.test(e.target.phone.value)){
			this.setState({
				error:'电话号码不正确，请重新输入！'
			})
			return false;
		}else if(!this.refs.df.checked&&!this.refs.djfh.checked&&!this.refs.zt.checked){
			this.setState({
				error:'请选择一种或多种服务！'
			})
		}else{
			this.setState({
				error:''
			})
			MarketInfoUtil.submit(submitData,function(res){
				console.log(res);
			});
		}
	},

	_changeFile: function(e) {
		var f = e.target;
		var me = this;
		if (!/\.jpe?g|\.png$/i.test(f.value)) {
			alert('请选择 JPG 或者 PNG 格式的图片');
			return;
		}
		if (f.files && f.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				me.setState({
					image: e.target.result,
					imageUrl:f.files[0]
				});
			};
			reader.readAsDataURL(f.files[0]);
		}
	},
	render: function () {
		var me=this;
		var market = ["新潮都","长运","长城","灏丰"];
		var marketHtml = market.map(function(res,index){
			res==me.state.data.market && market.splice(index,1);
			return(
				<option key={index}>{res}</option>
			);
		});
		var floorHmtl="";
		for(var i=1;i<=10;i++){
			i!=this.state.data.floor?floorHmtl+="<option>"+i+"</option>":
			floorHmtl+="<option selected>"+i+"</option>";
		}
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
		return (
			<div className="row">
				<div className="col-md-2">
					<div className="market-info">
						<SellerSide />
					</div>
				</div>
				<div className="col-md-10 cart-market-main">
					<div className="cart-market-main-current">
						<span>当前位置：账户管理 > </span>商家资料
					</div>
					<div className="cart-market-main-market-data">
						<div className="col-md-6">
							<form onSubmit={this._submit} ref="form">
								<ul>
									<li>
										<span>店铺名称：</span>
										<input name="store" onChange={this.handleStoreChange} type="text" value={this.state.store}/>
									</li>
									<li>
										<span>市场位置：</span><b>{this.state.data.location}</b>								
									</li>
									<li>
										<span>市场名称：</span>
										<select name="market">
											<option>{this.state.data.market}</option>
											{marketHtml}
										</select>
									</li>
									<li>
										<span>楼层：</span>
										<select name="floor" dangerouslySetInnerHTML={{__html:floorHmtl}} />
									</li>
									<li>
										<span>档口号：</span>
										<input name="stalls" type="text" onChange={this.handleStallsChange} value={this.state.stalls}/>
									</li>
									<li>
										<span>主营类目：</span>
										<select name='categoryId' value={this.state.selValue} onChange={this.handlecategoryChange} onClick={this.handlecategoryClick}>
											{this.state.categories&&this.state.categories.map(function(item,index){
												return(
													<option value={item.categoryId} key={index}>{item.category}</option>
												)
											})}
										</select>
									</li>
									<li>
										<span>店主姓名：</span><b>{this.state.data.shopkeeper}</b>
									</li>
									<li>
										<span>联系电话：</span>
										<input onBlur={this.handlePhoneBlur} name="phone" type="text" onChange={this.handlePhoneChange} value={this.state.phone}/>
										<ErrorMsg error={this.state.error}/>
									</li>
									<li>
										<span>商家服务：</span>
										<input ref="df" type="checkbox" name="df"/>
										<label onClick={this.handleLabelClick} data="df">代发</label>
										<input ref="djfh" type="checkbox" name="djfh"/>
										<label onClick={this.handleLabelClick} data="djfh">店家发货</label>
										<input ref="zt" type="checkbox" name="zt"/>
										<label onClick={this.handleLabelClick} data="zt">自提</label><br/>
									</li>
								</ul>
								<input type="submit" defaultValue="保存"/>
							</form>
						</div>
						<div className="col-md-5">
							<div>
								<img src={this.state.image?this.state.image:'/images/userImg.jpg'} title='头像'/>
								<span onClick={this.handleOpenClick}>编辑头像</span>
							</div>
							<ul className="col-md-7">
								<li>用户名称：{this.state.data.account}</li>
								<li>店主姓名：{this.state.data.shopkeeper}</li>
								<li>市场位置：{this.state.data.location}</li>
							</ul>
						</div>
					</div>
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={mStyle}>

						<h3 ref="subtitle">编辑头像</h3>
						<div>
							<button type='file' dir="xuanze" ref="close" onClick={this.closeModal}><span className="icon-iconfont-tupianku" ref="xuanze"></span>选择照片</button>
							<button ref="yes" onClick={this.closeModal}><span className="icon-iconfont-xiangji" ref="paishe"></span>拍摄照片</button>
						</div>
					</Modal>
					<div>
						<input style={{display:'none'}} type="file" ref="f" onChange={this._changeFile} accept="image/*"/>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = MarketInfo;