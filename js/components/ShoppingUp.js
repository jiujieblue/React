require('../../less/shopping-up.less');
var React = require('react');
var SellerSide = require('./SellerSide.js');
var ShoppingUpUtil = require('../utils/ShoppingUpUtil.js');
var ErrorMsg = require('./ErrorMsg.js');

require('bootstrap/js/modal.js');
require('bootstrap/js/dropdown.js');
require('bootstrap/js/tooltip.js');
require('font-awesome/css/font-awesome.css');
require('summernote/dist/summernote.css');
require('../libs/summernote.edited.js');
require('summernote/dist/lang/summernote-zh-CN.min.js');
$(document).ready(function() {
  $('.summernote').summernote();
});
var ShoppingUp = React.createClass({
	getInitialState:function(){
		return{
			error:'',
			step:1,
			checkColor:1,
			dataPart1:[],
			part1choose:-1,
			part2choose:-1,
			part3choose:-1,
			part1chooselist:-1,
			part2chooselist:-1,
			categoryId:'',
			showEdit:false,
			showColorDiy:false,
			showSizeDiy:false,
			showAddBrand:false,
			kucunpl:true,
			inputVal:'',
			inputValAll:[]
		}
	},
	componentDidMount:function(){
		ShoppingUpUtil.getData(function(res){
			this.setState({
				dataPart1:res.categories
			})
		}.bind(this))
	},
	_choosePart1:function(t){
		this.setState({
			error:'',
			part1choose:t,
			part1chooselist:t,
			part2chooselist:-1,
			part2choose:-1
		})
	},
	_choosePart2:function(t){
		var me=this;
		var categoryId='';
		if(!me.state.dataPart1[me.state.part1chooselist].sub[t].sub){
			categoryId=me.state.dataPart1[me.state.part1chooselist].sub[t].categoryId;
		}
		me.setState({
			error:'',
			part2choose:t,
			part2chooselist:t,
			part3choose:-1,
			categoryId:categoryId
		})

	},
	_choosePart3:function(t){
		var me=this;
		var categoryId='';
		categoryId=me.state.dataPart1[me.state.part1chooselist].sub[me.state.part2chooselist].sub[t].categoryId;
		me.setState({
			error:'',
			part3choose:t,
			categoryId:categoryId
		})
	},
	_nextStep:function(){
		var me=this;
		if(this.state.categoryId){
			this.setState({
				step:++this.state.step
			})
			ShoppingUpUtil.nextStep({categoryId:me.state.categoryId},function(res){
				
			})
		}
		else{
			this.setState({
				error:'请填写完整的分类信息'
			})
			return false;
		}
		
	},
	_reset:function(){
		this.setState({
			step:1,
			showEdit:false,
			showAddBrand:false
		})
	},
	_showEdit:function(){
		this.setState({
			showEdit:true
		})
	},
	_hideEdit:function(){
		this.setState({
			showEdit:false,
			showAddBrand:false
		})
	},
	_addBrand:function(){
		this.setState({
			showAddBrand:true
		})
	},
	_addPro:function(){
		var div=document.createElement('div');
		div.innerHTML='<input placeholder="属性名" /> : <span class="em"></span><input placeholder="属性值" /><button>删除</button>';
		document.querySelector('.addpro').appendChild(div);
	},


	_addRange:function(){
		var tr=document.createElement('tr');
		for(var i = 0; i < 3; i ++){
			var td=document.createElement('td');
			if(i==0){
				td.innerHTML='<input placeholder="请输入数量" />';
			}
			else if(i==1){
				td.innerHTML='<input placeholder="请输入金额" />';
			}
			else{
				td.innerHTML='<a>删 除</a>'
			}
			tr.appendChild(td)
		}
		document.querySelector('.priceareatable').appendChild(tr)
	},

	_checkColor:function(t){
		var me=this;
		me.setState({
			checkColor:t
		})
	},
	_colorDiy:function(e){
		var me=this;
		me.setState({
			showColorDiy:e.target.checked
		})
	},
	_sizeDiy:function(e){
		var me=this;
		me.setState({
			showSizeDiy:e.target.checked
		})
	},
	_kucunpl:function(e){
		var me=this;
		me.setState({
			kucunpl:!e.target.checked
		})
	},
	_changeVal:function(e){
		this.setState({
			inputVal:e.target.value
		})
	},
	_changeValAll:function(e){
		this._changeValSelf(e);	
	},
	_changeValSelf:function(e){
		var me=this;
		if(e.target.type=='text'){
			me.setState({
				inputValAll:(function(){
					me.state.inputValAll[e.target.getAttribute('dir')]=e.target.value;
					return me.state.inputValAll;
				})()
			})
		}
		else{
			var l=document.querySelectorAll('.kucuntable tbody tr').length;
			var arr=[];
			for(var i=0;i<l;i++){
				arr[i]=me.state.inputVal;
			}
			me.setState({
				inputValAll:arr
			})
		}
		
	},
	render: function () {
		var itemsPart1 = this.state.dataPart1.map(function(item,index){
			return(
				<li key={index} onClick={this._choosePart1.bind(this,index)} className={this.state.part1choose == index ? 'activechoose' : ''}>{item.name}</li>
			)
		},this);
		if(this.state.part1chooselist!= -1 && this.state.dataPart1[this.state.part1chooselist].sub){
			var itemsPart2 = this.state.dataPart1[this.state.part1chooselist].sub.map(function(item,index){
				return(
					<li key={index} onClick={this._choosePart2.bind(this,index)} className={this.state.part2choose == index ? 'activechoose' :''}>{item.name}</li>
				)
			},this)
		}
		if(this.state.part2chooselist!= -1 && this.state.dataPart1[this.state.part1chooselist].sub[this.state.part2chooselist].sub){
			var itemsPart3 = this.state.dataPart1[this.state.part1chooselist].sub[this.state.part2chooselist].sub.map(function(item,index){
				return(
					<li key={index} onClick={this._choosePart3.bind(this,index)} className={this.state.part3choose == index ? 'activechoose' :''}>{item.name}</li>
				)
			},this)
		}
		return (
			<div className="row">
				<div className="col-md-2">
					<SellerSide/>
				</div>

				<div className="col-md-10">
					<div className="shoppingup-content">
						<div className="shoppingup-content-local">
							<div>当前位置：商品管理 > 商品上传</div>
							<div>
								<div className={this.state.step > 0 ? "circle-out activeout" : "circle-out"}>
									<div className={this.state.step > 0 ? "circle-in activein" : "circle-in"}>1</div>
								</div>
								<p className={this.state.step > 0 ? "activep" : ""}>商品所属分类</p>

								<span className={this.state.step > 1 ? "activespan" : ""}></span>
								<div className={this.state.step > 1 ? "circle-out activeout" : "circle-out"}>
									<div className={this.state.step > 1 ? "circle-in activein" : "circle-in"}>2</div>
								</div>
								<p className={this.state.step > 1 ? "activep" : ""}>商品信息</p>
								<span className={this.state.step > 2 ? "activespan" : ""}></span>
								<div className={this.state.step > 2 ? "circle-out activeout" : "circle-out"}>
									<div className={this.state.step > 2 ? "circle-in activein" : "circle-in"}>3</div>
								</div>
								<p className={this.state.step > 2 ? "activep" : ""}>完成</p>
							</div>
						</div>
							
						<div className="shoppingup-content-choose" style={{display:this.state.step != 3 ? 'block' : 'none'}}>
							分类：请选择分类
							<button onClick={this._reset} style={{display:this.state.step ==2 ? 'inline-block' : 'none'}}>重新选择</button>
						</div>

						<div className="shoppingup-content-style" style={{display:this.state.step == 1 ? 'block' : 'none'}}>	
							<div>	
								<div>
									<ul>
										{itemsPart1}
									</ul>
								</div>
								<div style={{display:this.state.part1chooselist == -1 ? 'none' : 'block'}}>
									<ul>
										{itemsPart2}
									</ul>
								</div>
								<div style={{display:this.state.part2chooselist == -1 ? 'none' : 'block'}}>
									<ul>
										{itemsPart3}
									</ul>
								</div>
							</div>
							<div>
								<ErrorMsg error={this.state.error} />
								<button onClick={this._nextStep}>下一步</button>
							</div>
						</div>

						<div className="shoppingup-content-detail" style={{display:this.state.step == 2 ? 'block' : 'none'}}>
							<div className="shoppingup-content-detail-msg">
								<h4>1、基本信息</h4>
								<span></span>
								<form>
									<div>
										<label htmlFor="shoppingname"><span>*</span>商品名称:</label>
										<input id="shoppingname" type="text" placeholder="请输入商品的名称"/>								
									</div>
									<div>
										<label htmlFor="shoppingnum"><span className="em"></span><span className="em"></span><span className="em_5"></span>货号:</label>
										<input id="shoppingnum" type="text" placeholder="请输入商品的货号"/>
									</div>
									<div>
										<label><span className="em"></span><span className="em"></span><span className="em_5"></span>品牌:</label>
										<select>
											<option>--请选择--</option>
											<option>2</option>
											<option>3</option>
										</select>
										<span onClick={this._showEdit}>编辑品牌</span>
									</div>
									<div className="edit" style={{display:this.state.showEdit ? 'block' : 'none'}}>
										<div>品牌管理</div>
										<div>
											<button type="button" onClick={this._addBrand}>新增</button>
										</div>
										<table className="brandtable">
											<thead>
												<tr>
													<td>排序</td>
													<td>品牌</td>
													<td>操作</td>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td>红蜻蜓</td>
													<td>
														<a>下移</a>
														<a>删除</a>
													</td>
												</tr>
												<tr>
													<td>2</td>
													<td>红</td>
													<td>
														<a>上移</a>
														<a>下移</a>
														<a>删除</a>
													</td>
												</tr>
												<tr>
													<td>3</td>
													<td>蜻蜓</td>
													<td>
														<a>上移</a>
														<a>删除</a>
													</td>
												</tr>
											</tbody>
										</table>
										<div className="fanye">
											<span>向前</span>
											<span>向后</span>
										</div>
										<div className="fanhui">
											<button type="button" onClick={this._hideEdit}>返回</button>	
										</div>

										<div className="adddetail" style={{display:this.state.showAddBrand?'block' : 'none'}}>
											<div>新增品牌</div>
											<div>
												<label>品牌:</label>
												<input type="text" />
											</div>
											<div>
												<label>排序:</label>
												<input type="text" />
											</div>
											<div>
												<button type="button">确认</button>
												<button type="button">取消</button>
											</div>
										</div>

									</div>							
								</form>
							</div>

							<div className="shoppingup-content-detail-mould">
								<h4>2、产品属性</h4>
								<span></span>
								<select>
									<option>--请选择属性模板--</option>
									<option>1</option>
									<option>2</option>
								</select>
								<p>编辑模板属性</p>
								<form>
									<div className="input-box">	
										<div>
											<label>年份季节:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>								
										</div>
										<div>
											<label><span className="em"></span><span className="em"></span>裤长:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
										<div>
											<label><span className="em"></span><span className="em"></span>面料:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
										<div>
											<label>流行元素:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
									</div>

									<div className="input-box">
										<div>
											<label><span className="em"></span><span className="em"></span><span className="em"></span><span className="em"></span>风格:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
										<div>
											<label><span className="em"></span><span className="em"></span><span className="em"></span><span className="em"></span>厚薄:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
										
										<div>
											<label>服装款式细节:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
										<div>
											<label><span className="em"></span><span className="em"></span>成分含量:</label>
											<select>
												<option>--请选择--</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
									</div>						
								</form>
								<div>
									<div className="addpro"></div>
									<button onClick={this._addPro}>添加自定义属性</button>
								</div>
								
							</div>

							<div className="shoppingup-content-detail-price">
								<h4>3、产品定价</h4>
								<span></span>
								<form>
									<div className="xiaoshoustyle">
										<label><span>*</span>销售方式:</label>
										<input id="danjian" type="checkbox" /><label htmlFor="danjian">单件销售</label>
										<input id="dabao" type="checkbox" /><label htmlFor="dabao">打包销售</label>
									</div>
									<div className="xiaoshoudanwei">
										<label><span>*</span>销售单位:</label>
										<select>
											<option>件</option>
											<option>aa</option>
										</select>
									</div>
									<div className="xiaoshouprice">
										<label><span className="em"></span><span className="em"></span><span>*</span>价格:</label>
										<input id="yikoujia" type="radio" name="price"/>
										<label htmlFor="yikoujia">一口价</label>
										<input /> 元
									</div>
									<div className="pricearea">
										<p>
											<input type="radio" name="price" />
											<label>价格区间</label>
										</p>
										<div>
											<table className="priceareatable">
												<thead>
													<tr>
														<td>数 量</td>
														<td>金 额 ( 元 )</td>
														<td>操 作</td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<input placeholder="请输入数量" />
														</td>
														<td>
															<input placeholder="请输入金额" />
														</td>
														<td><a>删 除</a></td>
													</tr>
													<tr>
														<td>
															<input placeholder="请输入数量" />
														</td>
														<td>
															<input placeholder="请输入金额" />
														</td>
														<td><a>删 除</a></td>
													</tr>
													<tr>
														<td>
															<input placeholder="请输入数量" />
														</td>
														<td>
															<input placeholder="请输入金额" />
														</td>
														<td><a>删 除</a></td>
													</tr>
												</tbody>
											</table>
										</div>	
									</div>
								</form>
								<button onClick={this._addRange}>增加区间</button>
							</div>

							<div className="shoppingup-content-detail-rule">
								<h4>4、产品规则</h4>
								<span></span>
								<form>
									<div className="color-dif">
										<p><span>*</span>颜色分类:</p>
										<div>
											<ul>
												<li onClick={this._checkColor.bind(this,1)} className={this.state.checkColor == 1 ? 'active' : ''}>白色系</li>
												<li onClick={this._checkColor.bind(this,2)} className={this.state.checkColor == 2 ? 'active' : ''}>灰色系</li>
												<li onClick={this._checkColor.bind(this,3)} className={this.state.checkColor == 3 ? 'active' : ''}>蓝色系</li>
												<li onClick={this._checkColor.bind(this,4)} className={this.state.checkColor == 4 ? 'active' : ''}>蓝色系</li>
												<li onClick={this._checkColor.bind(this,5)} className={this.state.checkColor == 5 ? 'active' : ''}>蓝色系</li>
											</ul>
											<div className="color-detail" style={{display:this.state.checkColor == 1 ? 'block' : 'none'}}>
												<input type="checkbox" />
												<label>乳白色</label>
												<input type="checkbox" />
												<label>白色</label>
												<input type="checkbox" />
												<label>米白色</label>
											</div>
											<div className="color-detail" style={{display:this.state.checkColor == 2 ? 'block' : 'none'}}>
												<input type="checkbox" />
												<label>灰色</label>
												<input type="checkbox" />
												<label>灰色</label>
												<input type="checkbox" />
												<label>米灰色</label>
											</div>
											<div className="color-detail" style={{display:this.state.checkColor == 3 ? 'block' : 'none'}}>
												<input type="checkbox" />
												<label>蓝色</label>
												<input type="checkbox" />
												<label>蓝色</label>
												<input type="checkbox" />
												<label>天蓝色</label>
											</div>
											<div className="color-diy">
												<div>
													<input type="checkbox" onChange={this._colorDiy}/>
													<input placeholder="请输入自定义颜色" />
												</div>
												<div style={{display:this.state.showColorDiy ? 'block' : 'none'}}>
													<input type="checkbox" />
													<input placeholder="请输入自定义颜色" />
												</div>
											</div>
											<table>
												<thead>
													<tr>
														<td>颜色分类</td>
														<td>图片</td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>白色</td>
														<td>
															<div>+本地上传</div>
															<div>图片空间</div>
														</td>
													</tr>
													<tr>
														<td>米白色</td>
														<td>
															<div>+本地上传</div>
															<div>图片空间</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div className="size">
										<p><span className="em"></span><span className="em"></span><span>*</span>尺码:</p>
										<div>	
											<ul>
												<li>
													<input type="radio" name="size-dif"/>
													<label>通用</label>
												</li>
												<li>
													<input type="radio" name="size-dif" />
													<label>中国码</label>
												</li><li>
													<input type="radio" name="size-dif" />
													<label>欧码</label>
												</li><li>
													<input type="radio" name="size-dif" />
													<label>英码</label>
												</li><li>
													<input type="radio" name="size-dif" />
													<label>均码</label>
												</li>
											</ul>
											<div className="size-num">
												<input type="checkbox" name="size-num" />
												<label>145/52A</label>
												<input type="checkbox" name="size-num" />
												<label>150/56A</label>
												<input type="checkbox" name="size-num" />
												<label>155/60A</label>
												<input type="checkbox" name="size-num" />
												<label>160/64A</label>
												<input type="checkbox" name="size-num" />
												<label>170/72A</label>
											</div>
											<div className="size-diy">
												<div>
													<input type="checkbox" onChange={this._sizeDiy}/>
													<input placeholder="请输入自定义颜色" />
												</div>
												<div style={{display:this.state.showSizeDiy ? 'block' : 'none'}}>
													<input type="checkbox" />
													<input placeholder="请输入自定义颜色" />
												</div>
											</div>
										</div>
									</div>

									<div className="stock">
										<p><span>*</span>规格库存:</p>
										<div>
											<input type="checkbox" onChange={this._kucunpl}/>
											<input type="text" placeholder="请输入库存数量" onChange={this._changeVal} disabled={this.state.kucunpl}/>
											<button type="button" onClick={this._changeValAll} value={this.state.inputVal} style={{display:this.state.kucunpl ? 'none' : 'inline-block'}}>库存批量设置</button>
											<table className="kucuntable">
												<thead>
													<tr>
														<td>
															颜色分类
														</td>
														<td>
															尺寸
														</td>
														<td>
															库存(件)
														</td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															白色
														</td>
														<td>
															180/84A
														</td>
														<td>
															<input type="text" dir="0" onChange={this._changeValSelf} value={this.state.inputValAll[0] || ''} placeholder="请输入数量"/>
														</td>
													</tr>
													<tr>
														<td>
															白色
														</td>
														<td>
															180/84A
														</td>
														<td>
															<input type="text" dir="1" onChange={this._changeValSelf} value={this.state.inputValAll[1] || ''} placeholder="请输入数量"/>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</form>
							</div>

							<div className="shoppingup-content-detail-des">
								<h4>5、产品描述</h4>
								<span></span>
								<div className="pro-box">
									<p><span>*</span>产品主图:</p>
									<div className="des-box">
										<div className="pic-up">
											<div>!</div>
											至少上传三张图片
										</div>
										<div className="pic-file">
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
										</div>
										<div className="pic-file">
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
											<div className="pic-file-add">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div className="pro-box">
									<p><span className="em"></span><span className="em"></span><span>*</span>描述:</p>
									<div className="des-box">
										<div className="summernote"></div>
									</div>
								</div>
							</div>
							<div className="shoppingup-content-detail-transform">
								<h4>6、物流</h4>
								<span></span>
								<div>
									<p><span className="em"></span><span className="em"></span><span>*</span>运费</p>
									<div>
										<input type="checkbox" />
										<select>
											<option>--请选择运费模板--</option>
											<option>--1--</option>
											<option>--2--</option>
										</select>
										<button>新增运费模板</button>
									</div>
								</div>
							</div>

							<div className="shoppingup-content-detail-oth">
								<h4>7、其他</h4>
								<span></span>
								<div className="pro-show">
									<p><span>*</span>产品可见:</p>
									<input type="checkbox" />
									<label>完全开放</label>
									<input type="checkbox" />
									<label>仅会员可见</label>
								</div>
								<div className="pro-sale">
									<p><span>*</span>产品上架:</p>
									<div className="pro-sale-time">
										<div>
											<input type="checkbox" />
											<label>立即上架</label>	
										</div>
										<div>
											<input type="checkbox" />
											<label>设定上架时间</label>
											<select>
												<option>2016-07-01</option>
												<option>2016-06-01</option>
												<option>2016-05-01</option>
											</select>
											<select>
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span>时</span>
											<select>
												<option>10</option>
												<option>20</option>
												<option>30</option>
											</select>
											<span>分</span>
										</div>
										<div>
											<input type="checkbox" />
											<label>放入仓库</label>
										</div>
									</div>
								</div>
							</div>
							
							<div className="shoppingup-content-detail-caozuo">
								<button onClick={this._nextStep}>发布</button>
								<button>存草稿</button>
							</div>
						</div>

						<div className="shoppingup-content-succ" style={{display:this.state.step == 3 ? 'block' : 'none'}}>
							<div>
								<div><span className="icon-zhifuchenggong"></span></div>
								<h3>您的商品已成功发布!</h3>
								<div>可以在"商品管理"-"在售/停售商品"中查看</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ShoppingUp;