require('../../less/daifa-bank.less');
var React = require('react');
var DaifaSide = require('./DaifaSide.js');
var DaifaBankUtil = require('../utils/DaifaBankUtil.js');
var Modal = require('react-modal');
var DaifaBank = React.createClass({
	getInitialState:function(){
		return{
			type:1,
			getCode:0,
			lastSecond:5,
			data:[],
			cardNum:'',
			cardId:'',
			cardholder:'',
			defaultVal:false,
			addCardData:'',
			addCardBankName:'',
			addCardSelect:[],
			addCardNum:'',
			addCardPhone:''
		}
	},
	componentDidMount:function(){
		var me = this;
		DaifaBankUtil.getData(function(res){
			me.setState({
				data:res
			})
		})
	},
	openModal: function(t) {
		this.setState({
			modalIsOpen: true,
			cardNum:this.state.data[t].cardNum,
			cardId:this.state.data[t].cardId
		});
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
    _delCard:function(){
		var me = this;
		me.closeModal();
		var formData = new FormData();
		formData.append('cardId',me.state.cardId);
		DaifaBankUtil.delCard(formData, function(res) {
			if(res.result == 'success'){
				window.location.reload();
			}
		})
    },
	_addCard:function(t,e){
		var me = this;
		var target = e.target;
		if(target.nodeName == 'P' || target.nodeName == 'H3'){
			target = target.parentNode;
		}
		if(t==-1){
			me.setState({
				defaultVal:false,
				type:2
			})
			DaifaBankUtil.addCard({},function(res){
				console.log(res)
			})
		}
		else{
			me.setState({
				defaultVal:true,
				type:2,
				cardholder:me.state.data[t].cardholder
			})
			var formData = new FormData();
			formData.append('cardId',me.state.data[t].cardId);
			DaifaBankUtil.addCard(formData,function(res){
				me.setState({
					addCardData:res,
					addCardBankName:res.issuer,
					addCardSelect:res.banklist,
					addCardNum:res.cardNum,
					addCardPhone:''
				})
			})
		}

	},
	_changeCardNum:function(e){
		var me = this;
		me.setState({
			addCardNum:e.target.value
		})
	},
	_getCode:function(){
		var me = this;
		me.setState({
			getCode:1
		})
		var timer = setInterval(function(){
			if(me.state.lastSecond==1){
				clearInterval(timer);
				me.setState({
					getCode:0,
					lastSecond:5
				})
			}
			me.setState({
				lastSecond:(function(){
					--me.state.lastSecond;
					return me.state.lastSecond;
				})()
			})
		},1000)
	},
	_submit:function(e){
		var me = this;
		e.preventDefault();
		me.setState({
			type:3
		})
	},
	render: function () {
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
		var card={
			'中国银行':'bankCard_zg.png',
			'招商银行':'bankCard_zs.png',
			'中信银行':'bankCard_zx.png',
			'广东农信':'bankCard_gdnx.png',
			'广州农商银行':'bankCard_gzns.png',
			'中国建设':'bankCard_js.png',
			'平安银行':'bankCard_pa.png'
		};
		var itemsData = me.state.data.map(function(item,index){
			return(
				<div className="daifa-bank-card-detail" key={index}>
					<div className="detail-t">
						<img src={'./images/'+card[item.issuer]} />
						<p>存储卡</p>
					</div>
					<div className="detail-m">
						**** **** **** **** {item.cardNum}
					</div>
					<div className="detail-b">
						<a onClick={me._addCard.bind(me,index)}>编辑</a>
						<a onClick={me.openModal.bind(me,index)}>删除此卡</a>
					</div>
				</div>
			)
		})
		var itemsBank = me.state.addCardSelect.map(function(item,index){
			return(
				<option value={item.bank} key={index}>{item.bank}</option>
			)
		})
		return (
			<div className="row">
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={mStyle} >

					<h3 ref="subtitle">提示</h3>
					<h3 ref="cont">确定要删除尾号为{this.state.cardNum}的银行卡吗？</h3>
					<div ref="caozuo">
						<button ref="close" onClick={this.closeModal}>关闭</button>
						<button ref="yes" onClick={this._delCard}>确定</button>
					</div>
				</Modal>
				<div className="col-md-2">
					<DaifaSide/>
				</div>
				<div className="col-md-10">
					<div className="daifa-bank">
						<div className="daifa-bank-location">
							当前位置：我的钱包 > 银行卡管理
						</div>
						<div style={{display:this.state.type == 1 ? 'block' : 'none'}}>
							<div className="daifa-bank-title">
								我的银行卡
							</div>
							<div className="daifa-bank-card">
								{itemsData}
								<div className="daifa-bank-card-add" onClick={this._addCard.bind(this,-1)}>
									<h3>+</h3>
									<p>添加银行卡</p>
								</div>
							</div>
						</div>
						<div style={{display:this.state.type == 2 ? 'block' : 'none'}}>
							<form className="daifa-bank-addcard" onSubmit={this._submit}>
								<div className="xingming">
									<span className="em"></span><label>姓<span className="em"></span><span className="em"></span>名:</label>
									{this.state.cardholder}
								</div>
								<div className="shenfenzheng">
									<label><b>*</b><span className="em_5"></span>身份证号:</label>
									<input />
								</div>
								<div className="bankname">
									<label><b>*</b><span className="em_5"></span>银行名称:</label>
									<select value={this.state.addCardBankName}>
										{itemsBank}
									</select>
								</div>
								<div className="cardnum">
									<label><b>*</b><span className="em_5"></span>银行卡号:</label>
									<input value={this.state.addCardNum} onChange={this._changeCardNum} />
									<label className="tishi">只支持储蓄卡</label>
								</div>
								<div className="phonenum">
									<label><b>*</b><span className="em_5"></span>手机号码:</label>
									<input />
									<label className="tishi">请填写该卡在银行预留的手机号码</label>
								</div>
								<div className="yanzhengma">
									<label><b>*</b><span className="em_5"></span>验<span className="em_5"></span>证<span className="em_5"></span>码:</label>
									<input className="yanzhengmaipt" />
									<button type="button" className="getyanzhengma" onClick={this._getCode} disabled={this.state.getCode}>{this.state.getCode ? this.state.lastSecond+'秒后重发' :'获取验证码'}</button>
								</div>
								<div className="tijiao">
									<div><a>《柯咔在线支付相关协议》</a></div>
									<div><button type="submit">同意协议并确定</button></div>				
								</div>
							</form>
						</div>
						<div style={{display:this.state.type == 3 ? 'block' : 'none'}}>
							<div className="daifa-bank-addcardsucc">
								<span className="icon-addcardsucc"></span>
								<h3>添加银行卡成功</h3>
								<p>您已成功添加银行卡，返回银行卡管理界面可以对该银行卡进行管理。若需要<a>设置/修改支付密码</a>，请到账户管理 - 账户安全区设置，谢谢！</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = DaifaBank;