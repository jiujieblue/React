require('../../less/management-bank-card.less');
var React = require('react');
var Modal = require('react-modal');
var ManagementBankcardUtil=require('../utils/ManagementBankcardUtil.js');
var ErrorMsg = require('./ErrorMsg.js');
var BuyerSide = require('./BuyerSide.js');
var ManagementBankCard = React.createClass({
	getInitialState:function(){
		return {
			modalAddIsOpen:false,
			modalDelIsOpen:false,
			cardList:[],
			banklist:[],
			modalHtml:'',
			cardholder:'',
			cardNum:'',
			error:'',
			isCardholder:false,
			isCardNum:false,
			addOrEdit:null,
			cardId:null,
			selValue:''
		};
	},

	componentWillMount:function(){
		var me=this;
		ManagementBankcardUtil.getData('/cooka-store-web/m/myBankCard',function(res){
			me.setState({
				cardList:res
			});
		});
	},
	afterOpenModal1: function() {
    // references are now sync'd and can be accessed.
      this.refs.subtitle.style.color = '#fcc506';
      this.refs.subtitle.style.borderBottom = '2px solid #fcc506';
      this.refs.subtitle.style.paddingBottom = '15px';
    },
	afterOpenModal2: function() {
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
      this.refs.close.style.width = '200px';
      this.refs.close.style.height = '58px';
      this.refs.close.style.border = '1px solid #ddd';
      this.refs.close.style.borderRadius = '5px';
      this.refs.close.style.background = '#fff';
      this.refs.yes.style.float = 'right';
      this.refs.yes.style.width = '200px';
      this.refs.yes.style.height = '58px';
      this.refs.yes.style.border = '1px solid #ddd';
      this.refs.yes.style.borderRadius = '5px';
      this.refs.yes.style.background = '#fcc506';
    },

	openModal:function(e){
		var me = this;
		var dataCardId=e.target.getAttribute('data-cardId');
		this.setState({
			cardId:e.target.getAttribute('data-cardId')
		});
		this.setState({
			modalAddIsOpen:true,
			error:''
		})
		if(dataCardId){
			this.setState({
				modalHtml:'编辑此银行卡'
			});
			ManagementBankcardUtil.getData('/cooka-store-web/m/editBankCard?cardId='+dataCardId,function(res){
				me.setState({
					banklist:res.banklist,
					cardholder:res.cardholder,
					cardNum:res.cardNum,
					addOrEdit:1,
					selValue:res.issuer
				});
			});
		}else{
			this.setState({
				modalHtml:'添加银行卡'
			});
			ManagementBankcardUtil.getData('/cooka-store-web/m/editBankCard',function(res){
				me.setState({
					banklist:res.banklist,
					cardholder:'',
					cardNum:'',
					addOrEdit:0,
					selValue:''
				});
			});
		}
	},
	closeModal:function(){
		this.setState({
			modalAddIsOpen: false,
			error: ''
		});
	},
	delCard:function(e){
		e.preventDefault();
		this.setState({
			modalDelIsOpen:true,
			cardId:e.target.getAttribute('data-cardId')
		});
		
	},
	del:function(){
		var delCardId = new FormData(this.refs.form);
		delCardId.append('cardId',this.state.cardId);
		ManagementBankcardUtil.submit(delCardId,'/cooka-store-web/m/deleteBankCardHandler',function(res){
			if(res.result){
				location.reload();
			}
		});
	},
	closeDelModal:function(){
		this.setState({
			modalDelIsOpen:false
		});
	},
	handleNameChange:function(e){
		this.setState({
			cardholder:e.target.value
		});
	},
	handleAccountChange:function(e){
		this.setState({
			cardNum:e.target.value
		});
	},

	handleBlur:function(t,e){
		if(t==1){
			if(!e.target.value){
				this.setState({
					error: '姓名不能为空！',
					isCardholder: true
				});
			}else{
				this.setState({
					isCardholder: false
				});
				if(this.state.isCardNum){
					this.setState({
						error: '您输入的银行卡号有误，请重新输入！'
					});
				}else{
					this.setState({
						error: ''
					});
				}
			}
		}else{
			var me = this;
			var cardNum=e.target.value;
			ManagementBankcardUtil.getData('/cooka-finance-web/verifyCardNum?cardNum='+cardNum,function(res){
				if(!res.valid){
					me.setState({
						error:'您输入的银行卡号有误，请重新输入！',
						isCardNum: true
					});
				}else{
					me.setState({
						isCardNum: false
					});
					if(me.state.isCardholder){
						me.setState({
							error: '姓名不能为空！'
						});
					}else{
						me.setState({
							error: ''
						});
					}
				}
			});
		}
	},

	_submit:function(e){
		e.preventDefault();
		var cardNum=this.refs.cardNum.value;
		var me = this;
		var submitData = new FormData(this.refs.form);
		if(!this.state.isCardholder&&!this.state.isCardNum){
			console.log(!this.state.isCardNum)
			ManagementBankcardUtil.getData('/cooka-finance-web/verifyCardNum?cardNum='+cardNum,function(res){
				if(me.state.addOrEdit==0){
					ManagementBankcardUtil.submit(submitData,'/cooka-store-web/m/addBankCardHandler',function(res){
						if(res.result){
							location.reload();
						}
					});
				}else{
					submitData.append('cardId',me.state.cardId);
					ManagementBankcardUtil.submit(submitData,'/cooka-store-web/m/editBankCardHandler',function(res){
						if(res.result){
							location.reload();
						}
					});
				}
			});
		}
	},
	handleselChange:function(e){
		this.setState({
			selValue:e.target.value
		});
	},

	render: function () {
		var card={
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
				height: this.state.error?'500px' : '450px',
				marginTop: '-220px',
				marginLeft: '-280px',
				overflow: 'visible',
				border: '1px solid #ccc',
				background: '#fff',
				WebkitOverflowScrolling: 'touch',
				borderRadius: '4px',
				outline: 'none',
				padding: '20px 30px'
			}
		};
		return (
			<div className="row">
				<div className="col-md-2">
					<div>
						<BuyerSide />
					</div>
				</div>
				<div className="col-md-10">
					<div className="bank-box">
						<p>当前位置：我的钱包 > <span>银行卡管理</span></p>
						<div className="bank-box-card">
							<p>我的银行卡</p>
							<ul>
								{this.state.cardList.map(function(item,index){
									return(
										<li className="info" key={index} ref={'card'+index}>
											<div>
												<img src={'/images/'+card[item.issuer]+'.png'}/>
												<span>储存卡</span>
											</div>
											<p>****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;{item.cardNum}</p>
											<p><a data-cardId={item.cardId} onClick={me.openModal} href="#">编辑此卡</a><a data-cardId={item.cardId} onClick={me.delCard} href="#">删除此卡</a></p>
										</li>
									);
								})}
								<li className="info">
									<span>+</span>
									添加银行卡
									<i onClick={this.openModal}></i>
								</li>
							</ul>
						</div>
								
						<div>
							<Modal
								isOpen={this.state.modalAddIsOpen}
								onAfterOpen={this.afterOpenModal1}
								onRequestClose={this.closeModal}
								style={mStyle}>
								<h4 ref="subtitle">{this.state.modalHtml}</h4>
								<form className="bank-box-modal-form" ref='form' onSubmit={this._submit} noValidate>
									<span onClick={this.closeModal} className="icon-cha"></span>
									<ul>
										<li>
											开户银行：
											<select name='issuer' value={this.state.selValue} onChange={this.handleselChange}>
												{this.state.banklist.map(function(item,index){
													return(
														<option data-bankId={item.dankId} key={index}>{item.bank}</option>
													);
												})}
											</select>
										</li>
										<li>
											真实姓名：<input name='cardholder' ref='cardholder'  onBlur={this.handleBlur.bind(this,1)} onChange={this.handleNameChange} type="text" value={this.state.cardholder}/>
										</li>
										<li>
											银行账号：<input name='cardNum' ref='cardNum' onBlur={this.handleBlur.bind(this,2)} onChange={this.handleAccountChange} type="text" value={this.state.cardNum}/>
											<span>该银行卡开户名需跟真实姓名一致，否则将体现失败</span>
										</li>
									</ul>
									<ErrorMsg error={this.state.error}/>
									<div>
										<button ref="yes">保存账户</button>
									</div>
								</form>
							</Modal>
							<Modal
								isOpen={this.state.modalDelIsOpen}
								onAfterOpen={this.afterOpenModal2}
								onRequestClose={this.closeModal}
								style={mStyle} >

								<h3 ref="subtitle"><span className="icon-tishi" style={{color:'red',marginRight:'10px'}}></span>提示</h3>
								<h3 ref="cont" style={{textAlign:'center'}}>确定要删除此卡？</h3>
								<div ref="caozuo">
									<button ref="close" onClick={this.closeDelModal}>关闭</button>
									<button ref="yes" onClick={this.del}>确定</button>
								</div>
							</Modal>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = ManagementBankCard;