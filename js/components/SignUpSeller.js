require('../../less/sign-up-seller.less');
var React = require('react');
var SignUpSellerUtil=require('../utils/SignUpSellerUtil.js');
var fto=require('form_to_object');
var ErrorMsg = require('./ErrorMsg.js');

var SignUpSeller = React.createClass({
	getInitialState: function() {
		return {
			error: '',
			market:[],
			cat:[]
		};
	},
	componentDidMount:function(){
		var me=this;
		SignUpSellerUtil.getMarkets({},function(res){
			me.setState({
				market:res
			})
		});
		SignUpSellerUtil.getCats({},function(res){
			me.setState({
				cat:res
			})
		})
	},
	_length:function(e){
		var me=this;
		if(e.target.name=='storeName'){
			if(!e.target.value){
				me.setState({
					error:'店铺名称必填'
				})
				return false
			}
			else if(e.target.value.length>16){
				me.setState({
					error:'店铺字数过长，请重新输入'
				})
				return false
			}
			else{
				this.setState({
					error:''
				})
			}
			
		}
		if(e.target.name=='storeNum'){
			if(!e.target.value){
				me.setState({
					error:'档口名称必填'
				})
				return false
			}
			else if(e.target.value.length>16){
				me.setState({
					error:'档口字数过长，请重新输入'
				})
				return false
			}
			else{
				this.setState({
					error:''
				})
			}
			
		}if(e.target.name=='storeOwner'){
			if(!e.target.value){
				me.setState({
					error:'店主名称必填'
				})
				return false
			}
			else if(e.target.value.length>16){
				me.setState({
					error:'店主字数过长，请重新输入'
				})
				return false
			}
			else{
				this.setState({
					error:''
				})
			}
			
		}
	},
	_phone:function(e){
		var me=this;
		if(!(/^1[\d]{10}$/.test(e.target.value))){
			me.setState({
				error: '请输入正确的电话号码'
			});
			return false;
		}
		else{
			this.setState({
				error:''
			})
		}
	},
	_submit:function(e){
		var me=this;
		e.preventDefault();
		var data=fto(e.target);
		if(!data.storeName){
			this.setState({
				error:'店铺名称必填'
			})
			return false;
		}
		if(!data.marketId){
			this.setState({
				error:'市场名称必填'
			})
			return false;
		}
		if(!data.floor){
			this.setState({
				error:'楼层必填'
			})
			return false;
		}
		if(!data.storeNum){
			this.setState({
				error:'档口号必填'
			})
			return false;
		}
		if(!data.cateId){
			this.setState({
				error:'主营类目必填'
			})
			return false;
		}
		if(!data.storeOwner){
			this.setState({
				error:'店主姓名必填'
			})
			return false;
		}
		if(!data.mobile){
			this.setState({
				error:'联系电话必填'
			})
			return false;
		}
		if(!(/^1[\d]{10}$/.test(data.mobile))){
			this.setState({
				error: '请输入正确的电话号码'
			});
			return false;
		}
		SignUpSellerUtil.registStore(data,function(res){
			if(res.result=='already have store'){
				me.setState({
					error:'已有店铺'
				})
			}
		})
	},
	render: function () {
		var itemsMarket=this.state.market.map(function(item,index){
			return(
				<option key={index} value={item.marketId}>
					{item.market}
				</option>
			)
		});
		var itemsCat=this.state.cat.map(function(item,index){
			return(
				<option key={index} value={item.categoryId}>
					{item.category}
				</option>
			)
		});
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="sign-up-seller">
						<div className="sign-up-seller-panel">
							<div className="sign-up-seller-panel-header">
								<h4 className="sign-up-seller-panel-title">
									商家信息
								</h4>
							</div>
							<div className="sign-up-seller-panel-body">
								<form className="form-horizontal" onSubmit={this._submit}>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label sign-up-seller-req-label">
											店铺名称：
										</label>
										<div className="col-md-4">
											<input type="text" name="storeName" className="form-control input-lg" onBlur={this._length} />
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label">
											市场位置：
										</label>
										<div className="col-md-4">
											<input type="text" name="location" className="form-control input-lg" disabled value="广东广州"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label sign-up-seller-req-label">
											市场名称：
										</label>
										<div className="col-md-4">
											<select className="form-control input-lg" name="marketId">
												{itemsMarket}
											</select>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label sign-up-seller-req-label">
											楼层：
										</label>
										<div className="col-md-4">
											<select className="form-control input-lg" name="floor">
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
											</select>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label sign-up-seller-req-label">
											档口号：
										</label>
										<div className="col-md-4">
											<input type="text" name="storeNum" className="form-control input-lg" onBlur={this._length}/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label sign-up-seller-req-label">
											主营类目：
										</label>
										<div className="col-md-4">
											<select className="form-control input-lg" name="cateId">
												{itemsCat}
											</select>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label sign-up-seller-req-label">
											店主姓名：
										</label>
										<div className="col-md-4">
											<input type="text" name="storeOwner" className="form-control input-lg" onBlur={this._length} />
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label sign-up-seller-req-label">
											联系电话：
										</label>
										<div className="col-md-4">
											<input type="text" name="mobile" className="form-control input-lg" onBlur={this._phone}/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-offset-3 col-md-1 trim-col control-label">
											商家服务：
										</label>
										<div className="col-md-4">
											<div className="sign-up-seller-checkbox-group">
												<label className="checkbox-inline">
													<input type="checkbox" name="service" value="1"/> 自提
												</label>
												<label className="checkbox-inline">
													<input type="checkbox" name="service" value="2"/> 代发
												</label>
												<label className="checkbox-inline">
													<input type="checkbox" name="service" value="3"/> 店家发货
												</label>
											</div>
										</div>
									</div>
									<div className="form-group">
										<div className="col-md-offset-4 col-md-4">
											<ErrorMsg error={this.state.error} />
											<button type="submit" className="btn btn-primary btn-block btn-lg">
												提交
											</button>
										</div>
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

module.exports = SignUpSeller;