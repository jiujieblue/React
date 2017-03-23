require('../../less/orderconfirm.less');
var React = require('react');
var Modal = require('react-modal');
var OrderConfirmUtil = require('../utils/OrderConfirmUtil.js');

var ReceiptInfo = React.createClass({
	
	getInitialState:function(){
		return{
			tt:1,
			showForm:false,
			DMisOpen:false,
			EMisOpen:false
		}
	},
	_click:function(t){
		var me=this;
		me.setState({
			tt:t,
			showForm:false
		})
	},
	_show:function(){
		var me=this;
		if(me.state.showForm){
			me.setState({
				showForm:false			
			})	
		}
		else{
			me.setState({
				showForm:true
			})
		}
		
	},
	_showDelModal:function(){
		var me = this;
		me.setState({
			DMisOpen:true
		});
	},
	_showEditModal:function(){
		var me = this;
		me.setState({
			EMisOpen:true
		});
	},
	_closeDelModal:function(){
		var me = this;
		me.setState({
			DMisOpen:false
		});
	},
	_closeEditModal:function(){
		var me = this;
		me.setState({
			EMisOpen:false
		});
	},
	render:function(){
		/*删除地址弹框*/
		var DMstyle = {
			overlay : {
				position          : 'fixed',
				top               : 0,
				left              : 0,
				right             : 0,
				bottom            : 0,
				backgroundColor   : 'rgba(0, 0, 0, 0.75)',
				zIndex            : 999
			},
			content : {
				position                   : 'absolute',
				top                        : /*'0px',*/	'350px',
				left                       : /*'0px',*/	'700px',
				right                      : /*'0px',*/	'700px',
				bottom                     : /*'0px',*/	'350px',
				border                     : '1px solid #ccc',
				background                 : '#fff',
				overflow                   : 'auto',
				WebkitOverflowScrolling    : 'touch',
				borderRadius               : '0px',
				outline                    : 'none',
				padding                    : '0px'

			}
		};

		/*修改地址弹框*/
		var EMstyle = {
			overlay : {
				position          : 'fixed',
				top               : 0,
				left              : 0,
				right             : 0,
				bottom            : 0,
				backgroundColor   : 'rgba(0, 0, 0, 0.75)',
				zIndex            : 999
			},
			content : {
				position                   : 'absolute',
				top                        : '50%',
				left                       : '50%',
				width                      : '770px',
				height                     : '640px',
				marginTop                  : '-300px',
				marginLeft                 : '-380px',
				border                     : '1px solid #ccc',
				background                 : '#fff',
				overflow                   : 'auto',
				WebkitOverflowScrolling    : 'touch',
				borderRadius               : '0px',
				outline                    : 'none',
				padding                    : '0px'

			}
		};

		return (
			<div className="receiptinfo">
				<div className="receiptinfo-control">
					<span className="title">收货信息</span>
					<a className="manageaddr">管理收货地址</a>
				</div>
				<div className="receiptinfo-addr">
					<ul className="receiptinfo-addr-list">
						<li className={this.state.tt == 1 ? "receiptinfo-addr-list-item selected" : "receiptinfo-addr-list-item"}>
							<div className="radio ">
								<label>
									<input type="radio" name="AddrRadio" onChange={this._click.bind(this,1)}/>
									<i className={this.state.tt == 1 ? "glyphicon glyphicon-map-marker" : ""}></i>
									
									<i className={this.state.tt == 1 ? "circle active" : "circle" }></i>
									<span>广东省</span>
									<span>广州市</span>
									<span>白云区</span>
									<span>新市齐富路1525号</span>
									<span>510510</span>
									<span>(郑成功 收)</span>
									<span>13786525555</span>
									<span>0660-8601448</span>
									{this.state.tt == 1 ? <span>默认地址</span> : <span></span>}
									<span><a onClick={this._showEditModal}>修改地址</a></span>
									<span><a onClick={this._showDelModal}>删除</a></span>

									{/*--------------------DelBtnModal-------------------*/}
									<Modal isOpen={this.state.DMisOpen} onRequestClose={this._closeDelModal} style={DMstyle}>
										<div className="orederconfirm-modal-del-header">
											<p>
												<span className="glyphicon glyphicon-exclamation-sign" />
												<span>收货地址删除</span>
											</p>
										</div>
										<div className="orederconfirm-modal-del-body">
											<p>请确认是否删除如下收货信息：</p>
											<p>收货地址：
												<span>广东省</span>
												<span>广州市</span>
												<span>白云区</span>
												<span>新市齐富路1525号510510</span>
											</p>
											<p>收件人：郑成功</p>
											<p>联系电话：13786525555</p>
											<hr className="ck-hr"/>
										</div>
										<div className="orederconfirm-modal-del-footer">
											<div>
												<button type="button" className="btn delbtn">删除</button>
											</div>
											<div>
												<button type="button" className="btn celbtn" onClick={this._closeDelModal}>取消</button>
											</div>
										</div>
									</Modal>
									{/*--------------------DelBtnModal-------------------*/}

									{/*--------------------EditBtnModal-------------------*/}
									<Modal isOpen={this.state.EMisOpen} onRequestClose={this._closeEditModal} style={EMstyle}>
										<div className="orederconfirm-modal-edit-header">
											<p>
												<span>收货地址修改</span>
											</p>
										</div>
										<div className="orederconfirm-modal-edit-body">
											<p>
												<span className="glyphicon glyphicon-exclamation-sign" />
												<span>电话号码、手机号码选填一项，其余均为必填项</span>
											</p>
											<div className="editaddrform">
												<form className="">
													<div>
														<label><span>*</span>所在地区：</label>
														<select>
															<option>中国</option>
															<option>日本</option>
														</select>
														<select>
															<option>广东省</option>
															<option>广西省</option>
														</select>
													</div>
													<div>
														<label><span>*</span>详细地址：</label>
														<input type="text" placeholder="请直接填写街道等详细地址，不需要重复填写省市区" />
													</div>
													<div>
														<label><span>*</span>邮政编码：</label>
														<input type="text" />
													</div>
													<div>
														<label><span>*</span>收货人姓名：</label>
														<input type="text" />
													</div>
													<div>
														<label>手机号码：</label>
														<input type="text" placeholder="电话号码、手机号码选填一项"/>
													</div>
													<div>
														<label>电话号码：</label>
														<input type="text" placeholder="区号"/>-
														<input type="text" placeholder="电话号码"/>-
														<input type="text" placeholder="分机"/>
													</div>
													<div>
													<input type="radio" name="radio" id="radio1" /><label htmlFor="radio1">设为默认地址</label>
														<input type="radio" name="radio" id="radio2" /><label htmlFor="radio2">设为临时地址</label>
													</div>
												</form>
											</div>
											<hr className="ck-hr"/>
										</div>
										<div className="orederconfirm-modal-edit-footer">
											<button type="botton" className="btn btn-lg closebtn">确认</button>
											<button type="botton" className="btn btn-lg surebtn" onClick={this._closeEditModal}>关闭</button>
										</div>
									</Modal>
									{/*--------------------EditBtnModal-------------------*/}
								</label>
							</div>
						</li>
						<li className={this.state.tt == 2 ? "receiptinfo-addr-list-item selected" : "receiptinfo-addr-list-item"}>
							<div className="radio ">
								<label>
									<input type="radio" name="AddrRadio" onChange={this._click.bind(this,2)}/>
									<span className={this.state.tt == 2 ? "glyphicon glyphicon-map-marker" : ""}/>
									<i className={this.state.tt == 2 ? "circle active" : "circle" }></i>
									<span>广东省</span>
									<span>广州市</span>
									<span>白云区</span>
									<span>新市齐富路1525号</span>
									<span>510510</span>
									<span>(郑成功 收)</span>
									<span>13786525555</span>
									<span>0660-8601448</span>
									{this.state.tt == 2 ? <span>默认地址</span> : <span></span>}
									<span><a>修改地址</a></span>
									<span><a>删除</a></span>
								</label>
							</div>
						</li>
						<li className="receiptinfo-addr-list-item">
							<div className="radio">
								<label className="newaddr">
									<button type="button" className="btn" onClick={this._show}><span className="glyphicon glyphicon-plus" />使用新地址</button><span>（最多10个有效地址）</span>
								</label>
							</div>
							<div className="newaddrform" style={{display:this.state.showForm ? 'block' : 'none'}}>
								<p>电话号码、手机号码选填一项，其余均为必填项</p>
								<div className="row">
									<div className="col-md-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-md-2 control-label"><span>*</span>所在地区：</label>
												<div className="col-md-2">
													<select className="form-control">
														<option>广东省</option>
														<option>广西省</option>
													</select>
												</div>
												<div className="col-md-2">
													<select className="form-control">
														<option>广州市</option>
														<option>清远市</option>
													</select>
												</div>
												<div className="col-md-2">
													<select className="form-control">
														<option>荔湾区</option>
														<option>白云区</option>
													</select>
												</div>
												<div className="col-md-4"></div>
											</div>
											<div className="form-group">
												<label className="col-md-2 control-label"><span>*</span>详细地址：</label>
												<div className="col-md-4">
													<input type="text" className="form-control" placeholder="请直接填写街道等详细地址，不需要重复填写省市区" />
												</div>
												<div className="col-md-6"></div>
											</div>
											<div className="form-group">
												<label className="col-md-2 control-label"><span>*</span>邮政编码：</label>
												<div className="col-md-2">
													<input type="text" className="form-control" />
												</div>
												<div className="col-md-8"></div>
											</div>
											<div className="form-group">
												<label className="col-md-2 control-label"><span>*</span>收货人姓名：</label>
												<div className="col-md-2">
													<input type="text" className="form-control" />
												</div>
												<div className="col-md-8"></div>
											</div>
											<div className="form-group">
												<label className="col-md-2 control-label">手机号码：</label>
												<div className="col-md-4">
													<input type="text" className="form-control" placeholder="电话号码、手机号码选填一项" />
												</div>
												<div className="col-md-6"></div>
											</div>
											<div className="form-group">
												<label className="col-md-2 control-label">电话号码：</label>
												<div className="col-md-1">
													<input type="text" className="form-control" placeholder="区号" />
												</div>
												<div className="col-md-2">
													<input type="text" className="form-control" placeholder="电话号码" />
												</div>
												<div className="col-md-1">
													<input type="text" className="form-control" placeholder="分机" />
												</div>
												<div className="col-md-6"></div>
											</div>
											<div className="form-group">
												<div className="col-md-2"></div>
												<div className="checkbox col-md-4">
													<label className="control-label">
														<input type="checkbox" />
														设置未默认地址
													</label>
												</div>
												<div className="col-md-6"></div>
											</div>
											<div className="form-group">
												<div className="col-md-2"></div>
												<div className="col-md-2">
													<button type="submit" className="btn save_btn">保存</button>
												</div>
												<div className="col-md-2">
													<button type="submit" className="btn cel_btn">取消</button>
												</div>
												<div className="col-md-6"></div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

var OrderDtl = React.createClass({
	render:function(){
		return (
			<div className="orderdtl">
				<h3>订单详情</h3>
				<button className="btn daifa_btn">代发</button>
				<div className="row">
					<div className="orderdtl-details">
						<div className="col-md-12">
							{/*********表头*********/}
							<div className="orderdtl-details-title">
								<div className="col-md-3 text-center">商品</div>
								<div className="col-md-2 text-center">规格</div>
								<div className="col-md-1 text-center">单价(元)</div>
								<div className="col-md-1 text-center">数量</div>
								<div className="col-md-2 text-center">商品总价(元)</div>
								<div className="col-md-2 text-center">代发服务费</div>
								<div className="col-md-1 text-center">小计</div>
							</div>
							{/*一个商铺开始*/}
							<div className="orderdtl-details-stoproinfo">
								<div className="col-md-12">
									<div className="stoinfo">
										<span>SHOP</span>
										<span>嘟嘟服饰</span>
										<span>广东省</span>
										<span>广州市</span>
										<span>沙河区</span>
										<span>新潮都-1F-107</span>
										<span>(13678512369)</span>
									</div>
								</div>
								<div className="proinfo">
									<div className="col-md-1 trim-col">
										<img src="./images/test.jpg" />
									</div>
									<div className="col-md-2 trim-col">
										<div className="proinfo-msgbox">
											<span className="proinfo-msgbox-title">2016年夏季圆领宽松腰贴布中长款短袖连衣裙</span>
											<p className="proinfo-msgbox-pronum">货号：8634</p>
										</div>
									</div>
									<div className="col-md-2 text-center"><span>白色/175L</span></div>
									<div className="col-md-1 text-center"><span>100.00</span></div>
									<div className="col-md-1 text-center"><span>15</span></div>
									<div className="col-md-2 text-center"><span>1500.00</span></div>
									<div className="col-md-2 text-center"><span>30.00</span></div>
									<div className="col-md-1 text-center"><span>1530.00</span></div>
								</div>
								<div className="proinfo">
									<div className="col-md-1 trim-col">
										<img src="./images/test.jpg" />
									</div>
									<div className="col-md-2 trim-col">
										<div className="proinfo-msgbox">
											<span className="proinfo-msgbox-title">2016年夏季圆领宽松腰贴布中长款短袖连衣裙</span>
											<p className="proinfo-msgbox-pronum">货号：8634</p>
										</div>
									</div>
									<div className="col-md-2 text-center"><span>白色/175L</span></div>
									<div className="col-md-1 text-center"><span>100.00</span></div>
									<div className="col-md-1 text-center"><span>15</span></div>
									<div className="col-md-2 text-center"><span>1500.00</span></div>
									<div className="col-md-2 text-center"><span>30.00</span></div>
									<div className="col-md-1 text-center"><span>1530.00</span></div>
								</div>
								<div className="proinfo">
									<div className="col-md-1 trim-col">
										<img src="./images/test.jpg" />
									</div>
									<div className="col-md-2 trim-col">
										<div className="proinfo-msgbox">
											<span className="proinfo-msgbox-title">2016年夏季圆领宽松腰贴布中长款短袖连衣裙</span>
											<p className="proinfo-msgbox-pronum">货号：8634</p>
										</div>
									</div>
									<div className="col-md-2 text-center"><span>白色/175L</span></div>
									<div className="col-md-1 text-center"><span>100.00</span></div>
									<div className="col-md-1 text-center"><span>15</span></div>
									<div className="col-md-2 text-center"><span>1500.00</span></div>
									<div className="col-md-2 text-center"><span>30.00</span></div>
									<div className="col-md-1 text-center"><span>1530.00</span></div>
								</div>
								<div className="col-md-12 infofooter">
									<hr className="ck-hr" />
									<span>配送服务：代发</span>
								</div>
							</div>
							{/*一个商铺结束*/}

							{/*一个商铺开始*/}
							<div className="orderdtl-details-stoproinfo">
								<div className="col-md-12">
									<div className="stoinfo">
										<span>SHOP</span>
										<span>嘟嘟服饰</span>
										<span>广东省</span>
										<span>广州市</span>
										<span>沙河区</span>
										<span>新潮都-1F-107</span>
										<span>(13678512369)</span>
									</div>
								</div>
								{/*一个商铺中的一件商铺开始*/}
								<div className="proinfo">
									<div className="col-md-1 trim-col">
										<img src="./images/test.jpg" />
									</div>
									<div className="col-md-2 trim-col">
										<div className="proinfo-msgbox">
											<span className="proinfo-msgbox-title">2016年夏季圆领宽松腰贴布中长款短袖连衣裙</span>
											<p className="proinfo-msgbox-pronum">货号：8634</p>
										</div>
									</div>
									<div className="col-md-2 text-center"><span>白色/175L</span></div>
									<div className="col-md-1 text-center"><span>100.00</span></div>
									<div className="col-md-1 text-center"><span>15</span></div>
									<div className="col-md-2 text-center"><span>1500.00</span></div>
									<div className="col-md-2 text-center"><span>30.00</span></div>
									<div className="col-md-1 text-center"><span>1530.00</span></div>
								</div>
								{/*一个商铺中的一件商铺结束*/}

								{/*一个商铺中的一件商铺开始*/}
								<div className="proinfo">
									<div className="col-md-1 trim-col">
										<img src="./images/test.jpg" />
									</div>
									<div className="col-md-2 trim-col">
										<div className="proinfo-msgbox">
											<span className="proinfo-msgbox-title">2016年夏季圆领宽松腰贴布中长款短袖连衣裙</span>
											<p className="proinfo-msgbox-pronum">货号：8634</p>
										</div>
									</div>
									<div className="col-md-2 text-center"><span>白色/175L</span></div>
									<div className="col-md-1 text-center"><span>100.00</span></div>
									<div className="col-md-1 text-center"><span>15</span></div>
									<div className="col-md-2 text-center"><span>1500.00</span></div>
									<div className="col-md-2 text-center"><span>30.00</span></div>
									<div className="col-md-1 text-center"><span>1530.00</span></div>
								</div>
								{/*一个商铺中的一件商铺结束*/}

								<div className="proinfo">
									<div className="col-md-1 trim-col">
										<img src="./images/test.jpg" />
									</div>
									<div className="col-md-2 trim-col">
										<div className="proinfo-msgbox">
											<span className="proinfo-msgbox-title">2016年夏季圆领宽松腰贴布中长款短袖连衣裙</span>
											<p className="proinfo-msgbox-pronum">货号：8634</p>
										</div>
									</div>
									<div className="col-md-2 text-center"><span>白色/175L</span></div>
									<div className="col-md-1 text-center"><span>100.00</span></div>
									<div className="col-md-1 text-center"><span>15</span></div>
									<div className="col-md-2 text-center"><span>1500.00</span></div>
									<div className="col-md-2 text-center"><span>30.00</span></div>
									<div className="col-md-1 text-center"><span>1530.00</span></div>
								</div>
								<div className="col-md-12 infofooter">
									<hr className="ck-hr" />
									<span>配送服务：代发</span>
								</div>
							</div>
							{/*一个商铺结束*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var Carriage = React.createClass({
	render:function(){
		return (
			<div className="carriage">
				<div className="row">
					<div className="col-md-12">
						<form className="form-horizontal carform">
							<div className="form-group">
								<label className="col-md-2 control-label">配送方式：</label>
								<div className="col-md-2">
									<select className="form-control">
										<option>中通快递:¥7.00</option>
										<option>圆通快递:¥8.00</option>
										<option>顺丰快递:¥20.00</option>
									</select>
								</div>
								<div className="col-md-9"></div>
							</div>
							<div className="form-group">
								<label className="col-md-2 control-label">增值服务：</label>
								<div className="checkbox col-md-2">
									<label className="control-label">
										<input type="checkbox" />
										飞机盒
									</label>
								</div>
								<div className="checkbox col-md-2">
									<label className="control-label">
										<input type="checkbox" />
										小礼品(+1.00)
									</label>
								</div>
								<div className="col-md-6"></div>
							</div>
							<div className="form-group">
								<label className="col-md-2 control-label">订单留言：</label>
								<div className="col-md-4">
									<input type="text" className="form-control" placeholder="最多输入100个字" />
								</div>
								<div className="col-md-6"></div>
							</div>
							<p>您的特殊要求需要跟商家确认一致，否则视为无效。</p>
						</form>
						<span className="carmsg">运费：¥7.00</span>
						<span className="cartip">?</span>
					</div>
				</div>
			</div>
		);
	}
});

var GoodCoupon = React.createClass({
	render:function(){
		return (
			<div className="goodcoupon">
				<div className="row">
					<div className="col-md-12 trim-col">
						<div className="goodcoupon-title">
							<p>商品优惠券</p>
						</div>
						<div className="goodcoupon-body">
							<div className="col-md-4">
								<div className="checkbox">
									<input type="checkbox" />
									<div className="goodcoupon-body-card">
										<span>¥</span>
										<span>10</span>
										<span>现金券</span>
										<hr />
										<span>全场单笔满499</span>
										<span>有效期限：2016.7.21~2016.8.21</span>
										<span></span>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="checkbox">
									<input type="checkbox" />
									<div className="goodcoupon-body-card">
										<span>¥</span>
										<span>20</span>
										<span>现金券</span>
										<hr />
										<span>全场单笔满499</span>
										<span>有效期限：2016.7.21~2016.8.21</span>
										<span></span>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="checkbox">
									<input type="checkbox" />
									<div className="goodcoupon-body-uncard">
										<span>¥</span>
										<span>40</span>
										<span>现金券</span>
										<hr />
										<span>全场单笔满499</span>
										<span>有效期限：2016.7.21~2016.8.21</span>
										<span></span>
									</div>
								</div>
								<p className="goodcoupon-body-coupontip"><span className="glyphicon glyphicon-exclamation-sign"/>所有结算商品中没有符合条件的商品</p>
							</div>
						</div>
					</div>
					<div className="col-md-12 trim-col">
						<div className="goodcoupon-footer">
							<p>金额抵用：<span>¥10.00</span></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var OrderAccount = React.createClass({
	render:function(){
		return (
			<div className="orderaccount">
				<div className="row">
					<div className="col-md-12 trim-col">
						<div className="orderaccount-body">
							<p>商品总金额：¥4700.00</p>
							<p>增值服务费：¥0.00</p>
							<p>代发费：¥120.00</p>
							<p>运费：¥7.00</p>
							<p>返现：-¥10.00</p>
							<p>
								<span>寄送至：广东省广州市白云区同和街道白云区同和握山石决南街二巷二号</span>
								<span>收件人：邓先生</span>
								<span>电话：137*****823</span>
							</p>
							<p>
								<span>商品数量：60件</span>
								<span> 金额总计（含运费）：¥4887.00</span>
								<span>
									<button type="submit">提交</button>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var OrderConfirm = React.createClass({
	render:function(){
		return (
			<div className="orederconfirm">
				<ReceiptInfo />
				<OrderDtl />
				<Carriage />
				<GoodCoupon />
				<OrderAccount />
			</div>
		);
	}
});

module.exports = OrderConfirm;