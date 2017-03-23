require('../../less/accountsecuritylv.less');
var React = require('react');
var Modal = require('react-modal');
var AccountSecurityLvUtil = require('../utils/AccountSecurityLvUtil.js');

var AccountSecurityLv = React.createClass({
	render:function(){
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="col-md-2" style={{'backgroundColor':'#6E6E6E','color':'#fff'}}>
						<h1>我是侧栏</h1>
					</div>
					<div className="col-md-10">
						<div className="accountsecuritylv">
							<div className="accountsecuritylv-breadcrumbnav">
								<ol className="breadcrumb">
									<span>当前位置：</span>
									<li><a href="#">账号管理</a></li>
									<li className="active">账户安全</li>
								</ol>
							</div>
							<div className="accountsecuritylv-lv">
								<div className="lvbody">
									<span><strong>您的安全等级：</strong></span>
									<span>中</span>
									<div className="lvline"></div>
									<div className="lvline"></div>
									<div className="lvline"></div>
									<div></div>
									<div></div>
									<div></div>
									<span className="lvcircle">中</span>
								</div>
							</div>
							<hr className="ck-hr" />
							<div className="accountsecuritylv-bind">
								<div className="img">
									<img src="../images/shouji.svg" />
								</div>
								<span>绑定手机</span>
								<div>
									<p>绑定手机后，您可以免费享受柯咔网的短信提示服务，同时可用于找回账号登录密码和支付密码</p>
									<p>已绑定手机：<strong>15914678910</strong></p>
								</div>
								<button type="button" className="btn">修 改</button>
							</div>
							<hr className="ck-hr" />
							<div className="accountsecuritylv-bind">
								<div className="img">
									<img src="../images/denglu.svg" />
								</div>
								<span>登录密码</span>
								<div>
									<p>安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度6以上的密码</p>
									<p>密码强度：<strong>中</strong></p>
								</div>
								<button type="button" className="btn">修 改</button>
							</div>
							<hr className="ck-hr" />
							<div className="accountsecuritylv-bind">
								<div className="img">
									<img src="../images/zhifu.svg" />
								</div>
								<span>绑定手机</span>
								<div>
									<p>安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度6以上的密码</p>
									<p></p>
								</div>
								<button type="button" className="btn">修 改</button>
							</div>
							<hr className="ck-hr" />
							<button className="btn">提交</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = AccountSecurityLv;