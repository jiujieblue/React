require('../../less/editsigninpwd.less');
var React = require('react');
var fto = require('form_to_object');
var ErrorMsg = require('./ErrorMsg.js');
var EditSignInPwdUtil = require('../utils/EditSignInPwdUtil.js');

var EditSignInPwd = React.createClass({
	getInitialState:function(){
		return{
			step:1,
			way:'',
			time:60,
			error:'',
			disablebtn:false
		}
	},
	_GetVC:function(){
		var me = this ;
		me.setState({
			disablebtn:true
		});
		this.timer = setInterval(this._Countdown, 1000);
	},
	_Countdown:function(){
		this.setState({
			time: --this.state.time
		});
		if (this.state.time <= 0) {
			clearInterval(this.timer);
			this.setState({
				time: 60
			});
		}
	},
	_NextStep:function(step){
		var me = this ;
		me.setState({
			step:++me.state.step 
		});
	},
	_PreviousStep:function(step){
		var me =this ;
		me.setState({
			step:--me.state.step
		});
	},
	_Submit:function(e){
		var me=this;
		e.preventDefault();
		var data = fto(e.target);
		console.log(data);
		if(this.state.way == '通过原密码修改'){
			console.log(data.pwd)
			if (!data.pwd) {
				me.setState({
					error: '原密码不能为空'
				});
				return false;
			}else if(!/^[\w]{6,20}$/.test(data.newpwd)){
				this.setState({
					error: '原密码格式不正确'
				});
				return false;
			}
			if (!data.newpwd){
				me.setState({
					error: '新密码不能为空'
				});
				return false;
			}else if(!/^[\w]{6,20}$/.test(data.newpwd)){
				this.setState({
					error: '新密码格式不正确'
				});
				return false;
			}
			if (data.confirmnewpwd !== data.newpwd){
				me.setState({
					error: '两次密码输入不一致'
				})
				return false;
			}
			if(!me.state.error){
				me.setState({
					step:++me.state.step
				})
			}
		}
		if(this.state.way == '通过手机重置修改'){
			if (!data.vc){
				me.setState({
					error: '验证码不能为空'
				});
				return false;
			}
			if (!(/^[\d]{6}$/.test(data.vc))){
				me.setState({
					error: '验证码格式不正确'
				})
				return false;
			}
			if (!data.newpwd){
				me.setState({
					error: '新密码不能为空'
				});
				return false;
			}else if(!/^[\w]{6,20}$/.test(data.newpwd)){
				this.setState({
					error: '新密码格式不正确'
				});
				return false;
			}
			if (!data.confirmnewpwd){
				me.setState({
					error: '确认密码不能为空'
				});
				return false;
			}
			if(data.confirmnewpwd !== data.newpwd){
				me.setState({
					error: '两次密码输入不一致'
				})
				return false;
			}
			if(!me.state.error){
				console.log(111)
				me.setState({
					step:++me.state.step
				})
			}
		}
	},
	_ChooseWayone:function(){
		var me = this ;
		me.setState({
			way:'通过原密码修改'
		});
	},
	_ChooseWaytwo:function(){
		var me = this ;
		me.setState({
			way:'通过手机重置修改'
		});
	},
	render:function(){
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="col-md-2" style={{'backgroundColor':'#6E6E6E','color':'#fff'}}>
						<h1>我是侧栏</h1>
					</div>
					<div className="col-md-10">
						<div className="esip">
							<div className="esip-breadcrumbnav">
								<ol className="breadcrumb">
									<span>当前位置：</span>
									<li><a href="#">账号管理</a></li>
									<li><a href="#">账户安全</a></li>
									<li className="active">修改绑定手机</li>
								</ol>
							</div>
							<div className="esip-step">
								<div className="num1 activenum">
									<span>1</span>
								</div>
								<span>选择修改方式</span>
								<div className={this.state.step >= 2 ? 'dottedline activeline':'dottedline'}></div>
								<div className={this.state.step >= 2 ? 'num2 activenum':'num2'}>
									<span>2</span>
								</div>
								<span>修改登录密码</span>
								<div className={this.state.step >= 3 ? 'dottedline activeline':'dottedline'}></div>
								<div className={this.state.step >= 3 ? 'ok activenum':'ok'}>
									<span>√</span>
								</div>
								<span>完成</span>
							</div>
							<hr className="ck-hr" />
							{
								this.state.step == 1 ? 

								<div className="esip-way">
									<span>
										<strong>修改方式：</strong>
									</span>
									<div className="form">
										<form>
											<div>
												<input type="radio" name="radio" id="radio1" /><label htmlFor="radio1" onClick={this._ChooseWayone}>通过原密码修改</label>
											</div>
											<div>
												<input type="radio" name="radio" id="radio2"/><label htmlFor="radio2" onClick={this._ChooseWaytwo}>通过手机重置修改</label>
											</div>
										</form>
									</div>
									<button style={{display:this.state.step == 2 || this.state.step == 3?'none':'block' }} className="btn nextbtn" onClick={this._NextStep}>下一步</button>
								</div>
								:
								''
							}


							<div style={{display:this.state.step==2 ?'block' :'none'}} >
								<div style={{display:this.state.way =='通过原密码修改'? 'block' : 'none'}} className="esip-pwdset">
									<form onSubmit={this._Submit}>
										<div>
											<span>原<i className="_5em"></i><i className="_5em"></i>密<i className="_5em"></i><i className="_5em"></i>码：</span>
											<input type="text" placeholder="请输入原密码" name="pwd" />
										</div>
										<div>
											<span>新<i className="_5em"></i><i className="_5em"></i>密<i className="_5em"></i><i className="_5em"></i>码：</span>
											<input type="text" placeholder="请输入新密码" name="newpwd" />
											<span>6~20个字符，可由中英文、数字、"-"组成</span>
										</div>
										<div>
											<span>确认新密码：</span>
											<input type="text" placeholder="请再次输入新密码" name="confirmnewpwd"/>
										</div>
										<ErrorMsg error={this.state.error} />
										<div style={{display:this.state.step == 2?'block':'none' }} className="steptwobtn">
											<button className="btn prevbtn" onClick={this._PreviousStep}>上一步</button>
											<button type="submit" className="btn tijiaobtn">提交</button>
										</div>
									</form>
									<hr className="ck-hr" />
								</div>

								<div style={{display:this.state.way =='通过手机重置修改'? 'block' : 'none'}} className="esip-phoneset">
									<form onSubmit={this._Submit}>
										<div>
											<span>原手机号码：</span>
											<span>15966678910</span>
										</div>
										<div>
											<span>验<i className="_5em"></i><i className="_5em"></i>证<i className="_5em"></i><i className="_5em"></i>码：</span>
											<input type="text" placeholder="请输入验证码" name="vc" />
											<button type="button" className="btn" disabled={this.state.disablebtn} onClick={this._GetVC}>获取验证码</button>
											<button type="button" className="btn">获取验证码({this.state.time}s)</button>
										</div>
										<div>
											<span>新<i className="_5em"></i><i className="_5em"></i>密<i className="_5em"></i><i className="_5em"></i>码：</span>
											<input type="text" placeholder="请输入新密码" name="newpwd"/>
										</div>
										<div>
											<span>确认新密码：</span>
											<input type="text" placeholder="请再次输入新密码" name="confirmnewpwd"/>
										</div>
										<ErrorMsg error={this.state.error} />
										<div style={{display:this.state.step == 2?'block':'none' }} className="steptwobtn">
											<button className="btn prevbtn" onClick={this._PreviousStep}>上一步</button>
											<button type="submit" className="btn tijiaobtn">提交</button>
										</div>
									</form>
									<hr className="ck-hr" />
								</div>

							</div>
							<div style={{display:this.state.step == 3 ? 'block':'none'}} className="esip-done">
								<div className="img">
									<img src="./images/done.svg" />
								</div>
								<div className="text">
									<p>设置成功</p>
									<p>您已成功绑定新手机号码！</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = EditSignInPwd;