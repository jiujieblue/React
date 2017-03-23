require('../../less/buyer-account.less');
var React = require('react');
var _ = require('lodash');
var BuyerSide = require('./BuyerSide.js');
var Modal = require('react-modal');
var BuyerAccountUtil = require('../utils/BuyerAccountUtil.js');
var fto = require('form_to_object');
var ErrorMsg = require('./ErrorMsg.js');

var ProfileImage = React.createClass({
	getInitialState: function() {
		return {
			modalIsOpen: false
        };
    },
    openModal: function() {
		this.setState({
			modalIsOpen: true
		})
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
	closeModal: function(e) {
		this.setState({
			modalIsOpen: false
		});
		if(e.target.getAttribute('dir')){
			this.refs.f.click();
		}
    },
	render: function() {
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
			<div className="buyer-account-imageup">
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={mStyle} >

						<h3 ref="subtitle">编辑头像</h3>
						<div>
						<button dir="xuanze" ref="close" onClick={this.closeModal}><span className="icon-iconfont-tupianku" ref="xuanze"></span>选择照片</button>
						<button ref="yes" onClick={this.closeModal}><span className="icon-iconfont-xiangji" ref="paishe"></span>拍摄照片</button>
						</div>
					</Modal>
				<div>
					<img src={this.props.image ? this.props.image : './images/default_avatar.png'} width="120" height="120" />
					<input style={{display:'none'}} type="file" ref="f" onChange={this._changeFile} accept="image/*"/>
				</div>
				<button type="button" onClick={this.openModal}>编辑头像</button>
			</div>
			);
	},

	_changeFile: function(e) {
		var f = e.target;
		if (!/\.jpe?g|\.png$/i.test(f.value)) {
			alert('请选择 JPG 或者 PNG 格式的图片');
			return;
		}
		if (f.files && f.files[0]) {
			this.props.onChangeFile(f.files[0]);
		}
	}
});

var BuyerAccount = React.createClass({
	getInitialState: function() {
		return {
			error:'',
			modalIsOpen: false,
			type:1,
			showName:true,
			data:'',
			states:[],
			cities:[],
			regions:[],
			image:'',
			imageB:'',
			zhanghao:'',
			name:'',
			selfName:'',
			birth:'',
			phone:'',
			defaultPro:'',
			defaultCity:'',
			defaultRigion:'',
			gender:''
        };
    },
    componentDidMount:function(){
		BuyerAccountUtil.getData(function(res){
			this.setState({
				image:res.image,
				data:res,
				zhanghao:res.phone,
				name:res.name ? res.name : res.phone,
				phone:res.phone,
				gender:res.gender
			})
		}.bind(this))
    },
    
	_changeBir: function(e) {
		var nState = _.assign({}, this.state);
		nState[e.target.name] = e.target.value;
		this.setState(nState);
	},
	_formatDate: function(ts) {
		function fixZero(s) {
			return (s + '').length > 1 ? s : '0' + s;
		}

		if (!ts) {
			return '1979-01-01';
		}

		var d = new Date(ts);
		return d.getFullYear() + '-' + fixZero(d.getMonth() + 1) + '-' + fixZero(d.getDate());
	},
	_xiugai:function(){
		var me = this;
		me.setState({
			name:''
		})
	},
    _type:function(t){
		var me = this;
		me.setState({
			type:t
		})
		if(t==2){
			BuyerAccountUtil.getBasic(function(res){
				me.setState({
					selfName:res.userProfile.name,
					birth:me._formatDate(res.userProfile.birth),
					states:res.states,
					cities:res.cities,
					regions:res.regions,
					defaultState:res.userProfile.state,
					defaultCity:res.userProfile.city,
					defaultRegion:res.userProfile.region
				})
			})
		}
    },

    _bianjiName:function(){
		this.setState({
			showName:false
		})
    },
    _changeName:function(e){
    	var me = this;
    	me.setState({
    		selfName:e.target.value
    	})
    },
    _onChageFile: function(file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			this.setState({
				image: e.target.result,
				imageB:file
			});
		}.bind(this)
		reader.readAsDataURL(file);
	},
	_changeAddr:function(t,e){
		var me = this;
		var provinceId;
		var cityId;
		if(t==1){
			me.setState({
				defaultState:e.target.value
			})
			for(var p in me.state.states){
				if(me.state.states[p].name==e.target.value){
					provinceId=me.state.states[p].id
				}
			}
			BuyerAccountUtil.getCities({parentId: provinceId},function(res){
				me.setState({
					cities:res
				})
				BuyerAccountUtil.getRegions({parentId: me.state.cities[0].id},function(res){
					me.setState({
						regions:res
					})
				})
			})
		}
		if(t==2){
			me.setState({
				defaultCity:e.target.value
			})
			for(var p in me.state.cities){
				if(me.state.cities[p].name==e.target.value){
					cityId=me.state.cities[p].id
				}
			}
			BuyerAccountUtil.getRegions({parentId: cityId},function(res){
				me.setState({
					regions:res
				})
			})
		}
		if(t==3){
			me.setState({
				defaultRegion:e.target.value
			})
		}
	},
	_gender:function(e){
		var me = this;
		me.setState({
			gender:e.target.value
		})
	},
	_submit1:function(e){
		e.preventDefault();
		var me = this;
		var formData = new FormData();
		if(me.state.imageB){
			formData.append('image',me.state.imageB);
			formData.append('profileId',me.state.data.profileId);
			BuyerAccountUtil.formSubmit1(formData,function(){
				window.location.reload();
			})
		}
	},
	_submit2:function(e){
		var me = this;
		e.preventDefault();

		var data = fto(e.target);
		data.profileId = me.state.data.profileId;
		var formData = new FormData();	
		formData.append('name',data.name);
		formData.append('gender',data.gender);
		if(data.birth){
			formData.append('birth',data.birth);
		}
		formData.append('state',data.state);
		formData.append('city',data.city);
		formData.append('region',data.region);
		formData.append('profileId',data.profileId);
		BuyerAccountUtil.formSubmit2(formData,function(){
			window.location.reload();
		})
	},
	
	render: function () {
		var me = this;
		var itemsState = me.state.states.map(function(item,index){
			return(
				<option key={index}>{item.name}</option>
			)
		})
		var itemsCities = me.state.cities.map(function(item,index){
			return(
				<option key={index}>{item.name}</option>
			)
		})
		var itemsRegions = me.state.regions.map(function(item,index){
			return(
				<option key={index}>{item.name}</option>
			)
		})
		return (
			<div className="row">
				<div className="col-md-2">
					<BuyerSide/>
				</div>
				<div className="col-md-10">
					<div className="buyer-account">	
						<div className="buyer-account-location">
							当前位置：账号管理 > 个人资料
						</div>

						<div className="buyer-account-info">
							<a className={this.state.type == 1 ? 'active' : ''} onClick={this._type.bind(this,1)}>基本信息</a>
							<a className={this.state.type == 2 ? 'active' : ''} onClick={this._type.bind(this,2)}>个人信息</a>					
						</div>
						<div style={{display:this.state.type == 1 ? 'block' : 'none'}}>
							<form onSubmit={this._submit1}>
								<div className="buyer-account-basic">
									<div className="basic-l">
										<ProfileImage image={this.state.image} onChangeFile={this._onChageFile}/>
									</div>
									<div className="basic-r">
										<div>
											账<span className="em"></span><span className="em"></span>号 : {this.state.zhanghao}
										</div>
										<div style={{display:'none'}}>
											昵<span className="em"></span><span className="em"></span>称 :
											<span className="nicheng" style={{display:this.state.name ? 'inline-block' : 'none'}}>{this.state.name}</span>
											<input style={{display:this.state.name ? 'none' : 'inline-block'}} />
											<button onClick={this._xiugai}>修改</button>
										</div>
										<div>手机号码 : {this.state.phone}</div>
									</div>
								</div>
								<div className="buyer-account-submit">
									<button type="submit">保<span className="em"></span><span className="em"></span>存</button>
								</div>
							</form>
						</div>
						<div style={{display:this.state.type == 2 ? 'block' : 'none'}}>
							<div className="buyer-account-selfInfo">
								<p>带<b>*</b>处/为必填项 ; 请完善您的个人信息</p>
								<form onSubmit={this._submit2}>
									<div>
										<span className="em_5"></span>姓<span className="em"></span><span className="em"></span>名：
										<span className="text" style={{display:this.state.showName && this.state.name ? 'inline-block' : 'none'}} onClick={this._bianjiName}>{this.state.name}</span>
										<input name="name" className="bianji" onChange={this._changeName} value={this.state.selfName} style={{display:this.state.name && this.state.showName ? 'none' : 'inline-block'}} />
									</div>
									<div>
										<b>*</b>生<span className="em"></span><span className="em"></span>日：
										<input type="date" name="birth" value={this.state.birth} onChange={this._changeBir}/>
									</div>
									<div>
										<b>*</b>性<span className="em"></span><span className="em"></span>别：
										<input name="gender" className="check" id="man" type="radio" checked={this.state.gender == 'male' ? true : false} value="male" onChange={this._gender}/>
										<label htmlFor="man">男</label>
										<input name="gender" className="check" id="women" type="radio" checked={this.state.gender == 'female' ? true : false} value="female" onChange={this._gender} />
										<label htmlFor="women">女</label>
									</div>
									<div style={{display:'none'}}>
										<span className="em_5"></span>兴趣爱好：
										<textarea placeholder="不同项目之间，请用空格隔开，例如'旅行 阅读 瑜伽'"></textarea>
									</div>
									<div>
										<b>*</b>所<span className="em_5"></span>在<span className="em_5"></span>地：
										<select name="state" onChange={this._changeAddr.bind(this,1)} value={this.state.defaultState}>
											{itemsState}
										</select>
										<select name="city" onChange={this._changeAddr.bind(this,2)} value={this.state.defaultCity}>
											{itemsCities}
										</select>
										<select name="region" onChange={this._changeAddr.bind(this,3)} value={this.state.defaultRegion}>
											{itemsRegions}
										</select>
									</div>
									<div>
										<ErrorMsg error={this.state.error} />
									</div>
									<div>
										<button type="submit">保<span className="em"></span><span className="em"></span>存</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				
				
			</div>
			);
	}
});

module.exports = BuyerAccount;