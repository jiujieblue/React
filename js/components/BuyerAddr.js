require('../../less/buyer-addr.less');
var React = require('react');
var BuyerSide = require('./BuyerSide.js');
var Modal = require('react-modal');
var BuyerAddrUtil = require('../utils/BuyerAddrUtil.js');
var fto = require('form_to_object');
var Err = require('./ErrorMsg.js');
var BuyerAddr = React.createClass({
	getInitialState:function(){
		return{
			err:'',
			modalIsOpen: false,
			modalDel:false,
			index:-1,
			addDetShow:[],
			deliveraddrId:'',
			addContent:'',
			isDefaultAddr:false,
			modalAdd:false,
			data:[],
			newAddrDefault:false,
			newAddrProvince:[],
			newAddrCity:[],
			newAddrArea:[],
			provinceDefault:'',
		}
	},
	componentDidMount:function(){
		BuyerAddrUtil.getData(function(res){
			this.setState({
				data:res,
			})
		}.bind(this))
	},
	openModal: function(t1,t2) {
		var me =this;
		if(t1 == 1){
			me.setState({
				modalIsOpen: true,
				modalDel:true,
				deliveraddrId:t2
			})	
		}
		else if(t1 == 2){
			BuyerAddrUtil.newAddrProvince({parentId:1},function(res){
				me.setState({
					modalIsOpen: true,
					modalAdd:true,
					addContent:true,
					index:t2,
					deliveraddrId:t2,
					newAddrProvince:res,
					isDefaultAddr:t2==0,
					provinceDefault:(function(){
						for(var p in me.state.data[t2].address[0].items){
							if(me.state.data[t2].address[0].items[p]==me.state.data[t2].state){	
								me.state.provinceDefault = me.state.data[t2].address[0].items[p];
								return me.state.provinceDefault;
							}
						}
					})()
				})
			})
		}
		else{
			me.setState({
				modalIsOpen: true,
				modalAdd:true,
				addContent:false
			})
			BuyerAddrUtil.newAddrProvince({parentId:1},function(res){
				me.setState({
					newAddrProvince:res,
				})
				BuyerAddrUtil.newAddrCity({parentId: me.state.newAddrProvince[0].id}, function(res) {
					me.setState({
						newAddrCity:res,
						index:-1
					});
					BuyerAddrUtil.newAddrArea({parentId: me.state.newAddrCity[0].id}, function(res) {
						me.setState({
							newAddrArea:res,
							index:-1
						})
					})
				})
			})
		}
		
	},
	
	afterOpenModal: function() {
    // references are now sync'd and can be accessed.
      
    },
	closeModal: function() {
		this.setState({
			modalIsOpen: false,
			modalDel:false,
			modalAdd:false,
			addContent:false,
			index:-1,
			provinceDefault:''
		});
    },
	_del: function() {
		this.closeModal();
		BuyerAddrUtil.delAddr({
			deliveraddrId: this.state.deliveraddrId
		}, function() {
			window.location.reload();
		}.bind(this))
	},
	_moren: function(t) {
		BuyerAddrUtil.defaultAddr({"addrDefaultId": t}, function() {
			window.location.reload();
		})
	},
	_detailShow: function(t) {
			var me = this;
			me.setState({
				addDetShow: (function() {
					me.state.addDetShow[t] = true;
					return me.state.addDetShow;
				})()
			})
    },
	_newCity: function(e) {
		var me =this;
		me.setState({
			provinceDefault:e.target.value
		})
		var provinceId;
		for(var p in me.state.newAddrProvince){
			if(me.state.newAddrProvince[p].name == e.target.value){
				provinceId=me.state.newAddrProvince[p].id;
			}
		}
		BuyerAddrUtil.newAddrCity({parentId: provinceId}, function(res) {
			me.setState({
				newAddrCity:res,
				index:-1,
				isDefault:false
			});
			BuyerAddrUtil.newAddrArea({parentId: me.state.newAddrCity[0].id}, function(res) {
				me.setState({
					newAddrArea:res,
					index:-1
				})
			})
		})
		
	},
	_newArea: function(e) {
		var me =this;
		var cityId;
		for(var p in me.state.newAddrCity){
			if(me.state.newAddrCity[p].name == e.target.value){
				cityId=me.state.newAddrCity[p].id;
			}
		}
		BuyerAddrUtil.newAddrArea({parentId: cityId}, function(res) {
			me.setState({
				newAddrArea:res,
				index:-1,
				isDefault:false
			})
		})
	},
	_newAddrDefault:function(e){
		this.setState({
			newAddrDefault:e.target.checked,
			// isDefaultAddr:e.target.checked
		})
	},
	_submit:function(e){
		localStorage.setItem('a',100);
		var me = this;
		e.preventDefault();
		var data = fto(e.target);
		data.country = "中国";
		data.isDefault= me.state.newAddrDefault;
		if(!data.name){
			me.setState({
				err:'姓名不能为空'
			})
			return false;
		}
		if(data.name.length>16){
			me.setState({
				err:'请输入正确的姓名'
			})
			return false;
		}
		if(!data.addrDetail){
			me.setState({
				err:'详细地址不能为空'
			})
			return false;
		}
		if(!data.phone){
			me.setState({
				err:'手机号码必填'
			})
			return false;
		}
		if(data.phone && !(/^1\d{10}$/.test(data.phone))){
			me.setState({
				err:'手机号码输入有误'
			})
			return false;
		}
		if(!me.state.addContent){
			BuyerAddrUtil.newAddrForm(data,function(res){
				window.location.reload();
				me.closeModal();
			})
		}
		else{
			data.deliveraddrId = me.state.data[me.state.deliveraddrId].deliveraddrId;
			BuyerAddrUtil.updateAddrForm(data,function(res){
				me.closeModal();
				window.location.reload();
			})
		}
		
	},
	render: function () {
		var me=this;me
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
				width: '600px',
				height: '550px',
				marginTop: '-275px',
				marginLeft: '-300px',
				border: '1px solid #ccc',
				background: '#fff',
				overflow: 'auto',
				WebkitOverflowScrolling: 'touch',
				borderRadius: '4px',
				outline: 'none',
				padding: '20px'
			}
		};
		
		var itemsAddr = this.state.data.map(function(item,index){
			var detailLength = item.addrDetail.length;
			for(var i = 0;i<detailLength;i++){
				if(item.addrDetail.charCodeAt(i)>255){
					detailLength++;
				}
			}
			if(!index){
				return(
					<tr key={index}>
						<td><span className="icon-moren"></span>{item.name}</td>
						<td>{item.state} {item.city} {item.region}</td>
						<td className="addrdet">
							<div className={me.state.addDetShow[index] ? 'addrdetail addrdetailactive' : 'addrdetail'}>
								<p>{item.addrDetail}</p><span className={detailLength>24 ? 'icon-zhankai' : ''} onClick={me._detailShow.bind(me,index)}></span>
							</div>
						</td>
						<td>{item.zipcode}</td>
						<td>{item.phone}</td>
						<td>
							<a onClick={me.openModal.bind(me,2,index)}>编辑</a>
							<span className="em"></span>
							<span className="icon-sanchu" onClick={me.openModal.bind(me,1,item.deliveraddrId)}></span>
						</td>
					</tr>
				)
			}
			else{
				return(
					<tr key={index}>
						<td>{item.name}</td>
						<td>{item.state} {item.city} {item.region}</td>
						<td className="addrdet">
							<div className={me.state.addDetShow[index] ? 'addrdetail addrdetailactive' : 'addrdetail'}>
								<p>{item.addrDetail}</p><span className={detailLength>24 ? 'icon-zhankai' : ''} onClick={me._detailShow.bind(me,index)}></span>
							</div>
						</td>
						<td>{item.zipcode}</td>
						<td>{item.phone}</td>
						<td>
							<a onClick={me._moren.bind(me,item.deliveraddrId)}>设为默认</a><span className="em"></span><span>|</span><span className="em"></span>
							<a onClick={me.openModal.bind(me,2,index)}>编辑</a>
							<span className="em"></span>
							<span className="icon-sanchu" onClick={me.openModal.bind(me,1,item.deliveraddrId)}></span>
						</td>
					</tr>
				)
			}	
			
		});
		var province=[];
		var city=[];
		var area=[];
		if(me.state.index != -1){
			for(var p in me.state.data[me.state.index].address[0].items){
				province.push(<option key={p}>{me.state.data[me.state.index].address[0].items[p]}</option>)
			}
			city.push(<option key={0}>{me.state.data[me.state.index].address[1].value}</option>)		
			area.push(<option key={0}>{me.state.data[me.state.index].address[2].value}</option>)
		}
		if(me.state.index == -1){
			province = me.state.newAddrProvince.map(function(item,index){	
				return(
					<option key={index}>{item.name}</option>
				)
			})
		}
		if(me.state.index == -1){
			city = me.state.newAddrCity.map(function(item,index){
				return(
					<option key={index}>{item.name}</option>
				)
			})
		}
		if(me.state.index == -1){
			area = me.state.newAddrArea.map(function(item,index){
				return(
					<option key={index}>{item.name}</option>
				)
			})
		}
		return (
			<div className="row">
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={mStyle} >
					<div className="modal-del" style={{display: this.state.modalDel ? 'block' : 'none'}}>
						<div className="modal-del-tishi">
							<span className="icon-tishi"></span>
							删除
						</div>
						<div className="modal-del-text">
							<h3>您确定要删除该收货地址吗？</h3>
						</div>
						<div className="modal-del-button">
							<button className="modal-del-canc" onClick={this.closeModal}>取消</button>
							<button className="modal-del-sure" onClick={this._del}>确定</button>
						</div>
					</div>	
					<div className="modal-add" style={{display: this.state.modalAdd ? 'block' : 'none'}}>
						<div className="modal-add-tishi">
							<h4>{this.state.addContent ? '修改' : '添加'}收货地址</h4>
							<button onClick={this.closeModal}>取 消</button>
						</div>
						<div className="modal-add-form">
							<form onSubmit={this._submit}>
								<div>
									<b>*</b>
									<label>收货人姓名：</label>
									<input name="name" className="shouhuoname" defaultValue={this.state.addContent && this.state.index !=-1 ? this.state.data[this.state.index].name : ''}/>
								</div>
								<div>
									<b>*</b>
									<label>所在地区：</label><span className="em"></span>
									<select name="state" onChange={me._newCity} className="province" value={this.state.provinceDefault}>
										{province}
									</select>
									<select name="city" onChange={me._newArea} className="city">
										{city}
									</select>
									<select name="region" className="area">
										{area}
									</select>
								</div>
								<div>
									<b>*</b>
									<label>详细地址：</label><span className="em"></span>
									<input name="addrDetail" className="detailaddr" placeholder="请直接填写街道等详细信息，不需要重复填写省市区" defaultValue={this.state.addContent && this.state.index !=-1 ? this.state.data[this.state.index].addrDetail : ''}/>
								</div>
								<div>
									<span className="em_5"></span>
									<label>邮政编码：</label><span className="em"></span>
									<input name="zipcode" className="youzheng" defaultValue={this.state.addContent && this.state.index !=-1 ? this.state.data[this.state.index].zipcode : ''}/>
								</div>
								<div>
									<b>*</b>
									<label>手机号码：</label><span className="em"></span>
									<input name="phone" className="mobile" placeholder="电话号码、手机号码必须填一项" defaultValue={this.state.addContent && this.state.index !=-1 ? this.state.data[this.state.index].phone : ''}/>
								</div>
								<div>
									<span className="em_5"></span>
									<label>电话号码：</label><span className="em"></span>
									<input name="quhao" className="quhao" placeholder="区号" />-<input className="dianhua" placeholder="电话号码" />-<input className="fenji" placeholder="分机" />
								</div>
								<div className="moren-box">
									<input id="addrDefault" type="checkbox" className="moren" onChange={this._newAddrDefault}/>
									<label htmlFor="addrDefault">设置为默认地址</label>
								</div>
								<div className="baocun-box">
									<Err error={this.state.err} />
									<button type="submit">保存收货地址</button>
								</div>
							</form>
						</div>
					</div>				
				</Modal>
				<div className="col-md-2">
					<BuyerSide />
				</div>
				<div className="col-md-10">
					<div className="buyer-addr">
						<div className="buyer-addr-location">
							当前位置：账号管理 > 收货地址
						</div>
						<div className="buyer-addr-add">
							<button onClick={this.openModal.bind(this,3)}>新增收货地址</button>
						</div>
						<table className="buyer-addr-list">
							<thead>
								<tr>
									<td>收货人</td>
									<td>所在地址</td>
									<td>详细地址</td>
									<td>邮编</td>
									<td>联系方式</td>
									<td>操作</td>
								</tr>
							</thead>
							<tbody>
								{itemsAddr}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = BuyerAddr;