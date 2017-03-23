require('../../less/sign-up.less');
var React = require('react');
var SignUpUtil = require('../utils/SignUpUtil.js');
var fto = require('form_to_object');
var ErrorMsg = require('./ErrorMsg.js');

var SignUp = React.createClass({
	getInitialState: function() {
		return {
			error: '',
			phone: '',
			time: 60,
			sent: false,
			disableCodeBtn: true,
			result:''
		};
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

	render: function () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="sign-up">
						<div className="sign-up-panel">
							<div className="sign-up-panel-header">
								<span className="sign-up-panel-title">
									新用户注册
								</span>

								<span className="sign-up-panel-aside">
									已有账号？
									<a href="#" className="sign-up-panel-aside-link">
										立即登录
									</a>
								</span>
							</div>
							<div className="sign-up-panel-body">
								<form className="form-horizontal" onSubmit={this._submit}>
									<div className="form-group">
										<label className="col-md-4 control-label">
											手机号码
										</label>
										<div className="col-md-4">
											<div className="input-group input-group-lg">
												<span className="input-group-addon">
													<span className="icon-zhanghao" />
												</span>
												<input type="text" ref="phone" name="mobile" className="form-control" placeholder="请输入手机号码" onChange={this._typePhone} onBlur={this.yanzheng}/>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-4 control-label">
											密<span className="em"/><span className="em"/>码
										</label>
										<div className="col-md-4">
											<div className="input-group input-group-lg">
												<span className="input-group-addon">
													<span className="icon-mima" />
												</span>
												<input type="password" ref="pwd" name="confirmPassword" className="form-control" placeholder="请输入密码"/>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-4 control-label">
											确认密码
										</label>
										<div className="col-md-4">
											<div className="input-group input-group-lg">
												<span className="input-group-addon">
													<span className="icon-mima" />
												</span>
												<input type="password" name="confirmPasswordqr" className="form-control" placeholder="请再次输入密码"/>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-4 control-label">
											短信验证
										</label>
										<div className="col-md-2">
											<input type="text" ref="msg" name="txtMsg" className="form-control input-lg" placeholder="短信验证码"/>
										</div>
										<div className="col-md-2 trim-left">
											<button type="button" 
												className="sign-up-code-btn"
												disabled={this.state.disableCodeBtn}
												onClick={this._getCode}>
												{
													this.state.sent ? '重新获取验证码' + ('(' + this.state.time + 's)') : '获取验证码'
												}
											</button>
										</div>
									</div>
									<div className="form-group sign-up-agree">
										<div className="col-md-offset-4 col-md-4 text-center">
											注册即表示您同意 <a href="#">《柯咔网络用户协议》</a>
										</div>
									</div>

									<div className="form-group">
										<div className="col-md-offset-4 col-md-4">
											<ErrorMsg error={this.state.error} />
										</div>
									</div>

									<div className="form-group">
										<div className="col-md-offset-4 col-md-4">
											<button type="submit" className="btn btn-primary btn-lg btn-block">
											注册
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
	yanzheng:function(){
		var me=this;
		var d={mobile:this.refs.phone.value}; 
		SignUpUtil.registTestMobile(d,function(res){
				if(!(/^1[\d]{10}$/.test(me.refs.phone.value))){
					me.setState({
						error: '请输入正确的手机号码'
					});
					return false;
				}	
				if(res.result=='mobile_ok'){
					me.setState({
						error:''
					})
				}
				else{
					me.setState({
						error:'该用户已注册'
					})
					return false
				}
		})
	},
	_getCode: function() {
		var me=this;
		var d={mobile:this.refs.phone.value};
		this.setState({
			disableCodeBtn: true
		});
		this.setState({
			sent: true
		});
		this.tick = setInterval(this._countDown, 1000);
		SignUpUtil.registTxtMsg(d,function(res){
			me.setState({
				result:res.result,
			})
		},this)
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
	},
	_submit:function(e){
		var me=this;
		e.preventDefault();
		var data = fto(e.target);	
		if (!data.mobile) {
			this.setState({
				error: '手机号码不能为空'
			});
			return false;
		}
		else{
			this.setState({
				error: ''
			});
		}
		if(!(/^1[\d]{10}$/.test(data.mobile))){
			this.setState({
				error: '请输入正确的手机号码'
			});
			return false;
		}
		else{
			this.setState({
				error: ''
			});
		}
		if(!data.confirmPassword){
			this.setState({
				error: '密码不能为空'
			});
			return false;
		}
		else if (data.confirmPassword !== data.confirmPasswordqr) {
			this.setState({
				error: '两次密码输入不一致'
			});
			return false;
		}
		else{
			this.setState({
				error: ''
			});
		}
		if (!data.txtMsg){
			this.setState({
				error: '验证码不能为空'
			});
			return false;
		}
		else if (!(/^[\d]{6}$/.test(data.txtMsg))){
			this.setState({
				error: '验证码格式不正确'
			})
			return false;
		}
		else{
			this.setState({
				error: ''
			});
		}
		SignUpUtil.regist(data,function(res){
			if(res.result=="txtmsg_expired"){
				me.setState({
					error:'验证码错误'
				})
			}
			return false;
		})
	}
});

module.exports = SignUp;