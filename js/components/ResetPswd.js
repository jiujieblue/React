require('../../less/reset-pswd.less');
var React = require('react');
var ResetPswdUtil=require('../utils/ResetPswdUtil.js');
var fto=require('form_to_object');
var ErrorMsg = require('./ErrorMsg.js');

var ResetPswdStep1 = React.createClass({
	getInitialState: function() {
		return {
			error: '',
			phone: '',
			time: 60,
			sent: false,
			disableCodeBtn: true,
			result:''
		}
	},

	componentDidMount: function() {
		if (/^1[\d]{10}$/.test(this.refs.phone.value)) {
			this.setState({
				disableCodeBtn: false
			});
		}
	},

	componentWillUnmount: function() {
		clearInterval(this.tick);
	},

	_submit:function(e){
		var me=this;
		e.preventDefault();
		var data = fto(e.target);
		if(!(/^1[\d]{10}$/.test(data.mobile))){
			this.setState({
				error:'电话格式不正确'
			})
		}
		ResetPswdUtil.resetPassword(data,function(res){
			me.setState({
				result:res.result
			})
		})
	},

	render: function() {
		return (
			<form className="form-horizontal" onSubmit={this._submit}>
				<div className="form-group">
					<label className="col-md-offset-2 col-md-2 control-label">
						手机号码
					</label>
					<div className="col-md-5 trim-left">
						<div className="input-group input-group-lg">
							<span className="input-group-addon">
								<span className="icon-zhanghao" />
							</span>
							<input type="text" name="mobile" ref="phone" className="form-control" onChange={this._typePhone}/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label className="col-md-offset-2 col-md-2 control-label">
						短信验证
					</label>
					<div className="col-md-2 trim-col">
						<input type="text" name="txtMsg" className="form-control input-lg" />
					</div>
					<div className="col-md-3">
						<button type="button" 
							className="reset-pswd-code-btn"
							disabled={this.state.disableCodeBtn}
							onClick={this._getCode}>
							{
								this.state.sent ? '重新获取验证码' + ('(' + this.state.time + 's)') : '获取验证码'
							}
						</button>
					</div>
				</div>
				<div className="form-group">
					<div className="col-md-offset-4 col-md-5 trim-left">
						<ErrorMsg error={this.state.error} />

						<button type="submit" className="btn btn-primary btn-block btn-lg">
							提交
						</button>
					</div>
				</div>
			</form>
			);
	},

	_typePhone: function(e) {
		this.setState({
			phone: e.target.value
		});

		if (this.state.time === 60) {
			if (/^1[\d]{10}$/.test(this.refs.phone.value)) {
				this.setState({
					disableCodeBtn: false
				});
			}
			else {
				this.setState({
					disableCodeBtn: true
				});
			}
		}
	},

	_getCode: function() {
		this.setState({
			disableCodeBtn: true
		});
		this.setState({
			sent: true
		});
		this.tick = setInterval(this._countDown, 1000);
		var data={'mobile':this.refs.phone.value};
		ResetPswdUtil.resetPasswordTxtMsg(data,function(){

		})
	},

	_countDown: function() {
		this.setState({
			time: --this.state.time
		});

		if (this.state.time <= 0) {
			clearInterval(this.tick);
			this.setState({
				time: 60
			});
			if (/^1[\d]{10}$/.test(this.refs.phone.value)) {
				this.setState({
					disableCodeBtn: false
				});
			}
		}
	}
});

var ResetPswdStep3 = React.createClass({
	getInitialState: function() {
		return {
			error: ''
		}
	},
	_submit:function(e){
		e.preventDefault();
		var data=fto(e.target);
		if(data.password!=data.confirmPassword){
			this.setState({
				error:'两次密码输入不一致'
			})
			return false;
		}
		if(!data.password){
			this.setState({
				error:'密码格式不正确'
			})
			return false;
		}
		if(data.password==data.confirmPassword){
			ResetPswdUtil.submitPassword(data,function(res){
				this.setState({
					result:res.result
				})
			})
		}		
	},
	render: function() {
		return (
			<form className="form-horizontal" onSubmit={this._submit}>
				<div className="form-group">
					<label className="col-md-offset-2 col-md-2 control-label">
						新密码
					</label>
					<div className="col-md-5 trim-left">
						<div className="input-group input-group-lg">
							<span className="input-group-addon">
								<span className="icon-mima" />
							</span>
							<input type="password" name="password" className="form-control"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label className="col-md-offset-2 col-md-2 control-label">
						确认密码
					</label>
					<div className="col-md-5 trim-left">
						<div className="input-group input-group-lg">
							<span className="input-group-addon">
								<span className="icon-mima" />
							</span>
							<input type="password" name="confirmPassword" className="form-control"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-md-offset-4 col-md-5 trim-left">
						<ErrorMsg error={this.state.error} />
						<button type="submit" className="btn btn-primary btn-block btn-lg">
							提交
						</button>
					</div>
				</div>
			</form>
			);
	}
});

var ResetPswd = React.createClass({
	getInitialState: function() {
		return {
			step: 1
		};
	},

	render: function () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="reset-pswd">
						<div className="reset-pswd-panel">
							<div className="reset-pswd-panel-header">
								<h4 className="reset-pswd-panel-title">重置密码</h4>
							</div>
							<div className="reset-pswd-panel-body">
								<div className="reset-pswd-form">
									<div className="reset-pswd-steps">
										<div className={'reset-pswd-step' + (this.state.step >= 1 ? ' active' : '')}>
											<span>1</span>
											<div className="reset-pswd-step-text">输入账号</div>
										</div>
										<div className={'reset-pswd-step' + (this.state.step >= 2 ? ' active' : '')}>
											<span>2</span>
											<div className="reset-pswd-step-text">验证身份</div>
										</div>
										<div className={'reset-pswd-step' + (this.state.step >= 3 ? ' active' : '')}>
											<span>3</span>
											<div className="reset-pswd-step-text">重置密码</div>
										</div>
										<div className={'reset-pswd-step' + (this.state.step >= 4 ? ' active' : '')}>
											<span>4</span>
											<div className="reset-pswd-step-text">完成</div>
										</div>
									</div>

									{
										this.state.step === 1 ? <ResetPswdStep1 nextStep={this.nextStep}/> : null
									}

									{
										this.state.step === 3 ? <ResetPswdStep3 /> : null
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	},

	nextStep: function() {
		this.setState({
			step: 3
		});
	}
});

module.exports = ResetPswd;