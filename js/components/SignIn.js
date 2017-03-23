require('../../less/sign-in.less');
var React = require('react');
var SignInUtil=require('../utils/SignInUtil.js');
var fto=require('form_to_object');
var ErrorMsg = require('./ErrorMsg.js');

var SignIn = React.createClass({
	getInitialState: function() {
		return {
			error: ''
		};
	},
	_login:function(e){
		var me=this;
		e.preventDefault();
		var data=fto(e.target);
		SignInUtil.loginPc(data,function(res){
			if(res.result=='mobile_or_password_not_right'){
				me.setState({
					error:'用户名或密码错误'
				})
				return false;
			}

		})
	},
	render: function () {
		return (
			<div className="sign-in">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="sign-in-img">
								<img src="/images/login_keka.png" width="100%"/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="sign-in-panel">
								<div className="sign-in-panel-header">
									<span className="sign-in-panel-title">
										用户登录 /
									</span>
									<span>
										尊敬的柯咔用户，欢迎回来！
									</span>

									<div className="sign-in-panel-aside">
										<span>还没有账号？</span>
										<a href="#" className="sign-in-panel-aside-link">立即注册</a>
									</div>
								</div>
								<div className="sign-in-panel-body">
									<form onSubmit={this._login}>
										<div className="form-group">
											<div className="input-group input-group-lg">
												<span className="input-group-addon">
													<icon className="icon-zhanghao" />
												</span>
												<input type="text" name="mobile" className="form-control" placeholder="请输入手机号码"/>
											</div>
										</div>
										<div className="form-group">
											<div className="input-group input-group-lg">
												<span className="input-group-addon">
													<icon className="icon-mima" />
												</span>
												<input type="password" name="password" className="form-control" placeholder="请输入密码"/>
											</div>
										</div>

										<div className="sign-in-panel-options">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-md-6">
														<div className="checkbox">
															<label>
																<input type="checkbox"/> 记住账号
															</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="text-right">
															<a href="#">
																忘记密码？
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="form-group">
											<ErrorMsg error={this.state.error} />
										</div>

										<div className="form-group">
											<button type="submit" className="btn btn-primary btn-block btn-lg">
												登录
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = SignIn;