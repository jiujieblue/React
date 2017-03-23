require('../../less/daifa-withdrawal.less');
var React = require('react');
var BuyerSide = require('./BuyerSide.js');
var ErrorMsg = require('./ErrorMsg.js');
var DaifaWithdrawalUtil=require('../utils/DaifaWithdrawalUtil.js');
var DaifaWithdrawal = React.createClass({
	getInitialState:function(){
		return {
			isRotate:true,
			cardData:'',
			cardList:[],
			cardFirst:'',
			cardId:'',
			mHTML:'',
			pHTML:'',
			error:'',
			modifyPwd:false,
			isDisabled: '',
			disabledTime:''
		};
	},
	handleCardMouseOver:function(){
		this.refs.rotate.className='rotate';
		this.refs.cardList.className='shou';
	},
	handleCardMouseOut:function(){
		this.refs.rotate.className='';
		this.refs.cardList.className='';
	},
	componentDidMount:function(){
		var me = this;
		DaifaWithdrawalUtil.getBankcard(function(res){
			me.setState({
				cardData:res,
				cardList:res.bankCards,
				cardFirst:res.bankCards[0],
				cardId: res.bankCards[0].cardId
			});
		});
		// 进入事件
		$(this.refs.cardList).delegate('li','mouseover',function(e){
			e.stopPropagation();
			me.refs.cardList.className='shou';
			me.refs.rotate.className='rotate';
		});
		// 移出事件
		$(this.refs.cardList).delegate('li','mouseout',function(e){
			e.stopPropagation();
			me.refs.cardList.className='';
			me.refs.rotate.className='';
		});
		// 点击事件
		$(this.refs.cardList).delegate('li','click',function(e){
			e.stopPropagation();
			if(e.target.nodeName=='IMG'||e.target.nodeName=='SPAN'){
				e.target=e.target.parentNode;
			}
			me.refs.chosen.innerHTML=e.target.innerHTML;
			me.setState({
				cardId: e.target.getAttribute('data-cardId'),
				error:''
			});
		});
		this.refs.pwd.disabled=this.state.isDisabled;
		this.refs.login.disabled=this.state.isDisabled;
		this.state.isDisabled&&(this.refs.login.background='#ccc');
	},
	//鼠标移出输入框
	handleManeyBlur:function(n,e){
		var regP = /^[\w\W]{6,20}$/g;
		var regM = /^\d*$/;
		if(n==1){
			if(!e.target.value||!regM.test(e.target.value)){
				this.setState({
					mHTML:'请输入金额！'
				});
				this.refs.money.className='seller-withdrawal-input';
			}else if(e.target.value<20){
				this.setState({
					mHTML:'金额不能小于20元！'
				});
				this.refs.money.className='seller-withdrawal-input';
			}else{
				this.setState({
					mHTML:''
				});
				this.refs.money.className='';
			}
		}else if(n==0&&!e.target.value){
			this.setState({
				pHTML:'密码不能为空！'
			});
			this.refs.pwd.className='seller-withdrawal-input';
		}else if(!regP.test(e.target.value)){
			this.setState({
				pHTML:'密码长度不正确，请重新输入！'
			});
			this.refs.pwd.className='seller-withdrawal-input';
		}else{
			this.setState({
				pHTML:''
			});
			this.refs.pwd.className='';
		}
	},
	
	// 登录
	_submit:function(e){
		e.preventDefault();
		var regP = /^[\w\W]{6,20}$/g;
		var regM = /^\d*$/;
		var me = this;
		var data = new FormData(this.refs.form);
			if(!this.refs.money.value||!regM.test(this.refs.money.value)){
				this.setState({
					mHTML:'请输入金额！'
				});
				this.refs.money.className='seller-withdrawal-input';
			}else if(this.refs.money.value<20){
				this.setState({
					mHTML:'金额不能小于20！'
				});
				this.refs.money.className='seller-withdrawal-input';
			}else if(!this.refs.pwd.value){
				this.refs.money.className='';
				this.setState({
					pHTML:'密码不能为空！'
				});
				this.refs.pwd.className='seller-withdrawal-input';
			}else if(!regP.test(this.refs.pwd.value)){
				this.setState({
					pHTML:'密码长度不正确，请重新输入！'
				});
				this.refs.pwd.className='seller-withdrawal-input';
			}else{
				data.append('cardId',this.state.cardId);
				DaifaWithdrawalUtil.userLogin(data,function(res){
					if(res.passwordEnterChance<=-2){
						me.setState({
							isDisabled: 'disabled',
							disabledTime: me._setData((new Date()).getTime()),
							pHTML:'您输入错误次数过多'
						});
						me.refs.pwd.className='seller-withdrawal-input';
					}else{
						me.setState({
							passwordEnterChance:res.passwordEnterChance
						});
						if(res.result=='passwordError'){
							me.setState({
								pHTML:'密码错误，还剩'+res.passwordEnterChance+'次输入机会！',
								modifyPwd:true
							});
						}else if(res.result=='notEnoughBalance'){
							me.setState({
								error:'您的余额不足！',
								errorState:1
							});
						}
					}
				});
			}
	},
	handletijiaoClick:function(){
		this.refs.caozuo.style.left="-100%";
		this.refs.results.style.left="0";
	},
	handleBackClick:function(){
		this.refs.caozuo.style.left="0";
		this.refs.results.style.left="100%";
	},
	render: function () {
		var cards={
			'中国银行':'bankCard_zg',
			'招商银行':'bankCard_zs',
			'中信银行':'bankCard_zx',
			'广东农信':'bankCard_gdnx',
			'广州农商银行':'bankCard_gzns',
			'中国建设银行':'bankCard_js',
			'平安银行':'bankCard_pa',
			'广发银行':'bankCard_gf',
			'广州银行':'bankCard_gz',
			'广州农商':'bankCard_gzns',
			'华夏银行':'bankCard_hx',
			'中国光大银行':'bankCard_zggd',
			'中国工商银行':'bankCard_zggs',
			'中国民生银行':'bankCard_zgms',
			'中国农业银行':'bankCard_zgny',
			'中国邮政储蓄银行':'bankCard_zgyzcx'
		}
		return (
			<div className="row">
				<div className="col-md-2">
					<div>
						<BuyerSide />
					</div>
				</div>
				<div className="col-md-10">
					<div className="daifa-withdrawal">
						<p><span>当前位置：我的钱包 > </span>提现</p>
						<div className="daifa-withdrawal-caozuo" ref="caozuo">
							<p>提现</p>
							<form ref='form' onSubmit={this._submit}>
								<div>
									<ul>
										<li>
											<span>选择银行卡：</span>
											<div>
												<p style={{display:this.state.cardList.length==0?'block':'none'}}>您没有银行卡，请速速添加！</p>
												<div style={{display:this.state.cardList.length==0?'none':'block'}} ref='chosen' onMouseOver={this.handleCardMouseOver} onMouseOut={this.handleCardMouseOut}>
													{this.state.cardList.map(function(item,index){
														if(item.default){
															return (
																<div key={index}>
																	<img src={'/images/'+cards[item.issuer]+'.png'} title='银行卡logo'/>
																	尾号 ：<span>{item.cardNum}</span>储蓄卡
																</div>
															)
														}else{
															if(index==0){
																return (
																	<div key={index}>
																		<img src={'/images/'+cards[item.issuer]+'.png'} title='银行卡logo'/>
																		尾号 ：<span>{item.cardNum}</span>储蓄卡
																	</div>
																)
															}
														}
													})}
													
												</div>
												<i ref='rotate' style={{display:this.state.cardList.length==0?'none':'block'}} onMouseOver={this.handleCardMouseOver}></i>
												<ul ref='cardList'>
													{this.state.cardList.map(function(item,index){
														return (
															<li key={index} data-cardId={item.cardId}>
																<img src={'/images/'+cards[item.issuer]+'.png'} title='银行卡logo'/>
																尾号 ：<span>{item.cardNum}</span>尼玛卡
															</li>
														);
													})}
												</ul>
											</div>
										</li>
										<li><span></span><a href='http://localhost/cooka-user-web/center/bankCardList'>添加银行卡</a></li>
									</ul>
									<ul>
										<li>
											<span>可提现余额：</span>{this.state.cardData.balance||'0.00'} 元
										</li>
										<li ref='errorMoney'>
											<span>提 现 金 额：</span>
											<input type='text' className='' placeholder='请输入金额' name='money' ref='money' onBlur={this.handleManeyBlur.bind(this,1)}/>
											<p>{this.state.mHTML}</p>
										</li>
										<li ref='errorPwd'>
											<span>支 付 密 码：</span>
											<input type='password' placeholder='请输入支付密码' name='pwd' ref='pwd' onBlur={this.handleManeyBlur.bind(this,0)}/>
											<a style={{display:this.state.modifyPwd?'inline-block':'none'}} href='#'>忘记密码</a>
											<p>{this.state.pHTML}{this.state.disabledTime}</p>
										</li>
									</ul>
								</div>
								<ErrorMsg error={this.state.error}/>
								<p><span>&lowast;</span>一千元以上不收手续费，低于一千元收两块钱手续费。视具体银行到账时间稍有延迟，请注意查收。</p>
								<p><button ref='login' onClick={this.handletijiaoClick}>提&nbsp;&nbsp;&nbsp;交</button></p>
							</form>
						</div>
						<div className="daifa-withdrawal-results" ref="results">
							<div>
								<link className='icon-success'/>
								提交提现申请成功
							</div>
							<ul>
								<li>
									您已成功提交提现申请，
								</li>
								<li>
									提现金额将在1-3个工作日打款到您指定的银行中，
								</li>
								<li>
									请注意查收，谢谢！
								</li>
							</ul>
							<p><button type="button" onClick={this.handleBackClick}>返回</button></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = DaifaWithdrawal;