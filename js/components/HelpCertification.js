require('../../less/help-certification.less');
var React = require('react');
var HelpSide = require('./HelpSide.js');
var HelpCertification = React.createClass({
	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<HelpSide />
				</div>
				<div className="col-md-10">
					<div className="help-certification">
						<div className="help-certification-location">
							当前位置：实名认证
						</div>
						<div className="help-certification-box">
							<div className="help-certification-box-intro">实名认证介绍</div>
							<div className="help-certification-box-detail">
								<div className="certification-method-q">
									<h4>如何实名认证？</h4>
								</div>
								<div className="certification-method-a">
									<p>
										1.打开"我的钱包"-"账号管理"-"实名认证"页面，按照流程提示完成身份及银行卡信息验证，即可完成；
									</p>
									<p>
										2.在首次成功使用快捷支付后，系统将自动使用该卡持卡人身份完成认证。
									</p>
								</div>
								<div className="certification-xiugai-q">
									<h4>实名认证成功后信息如何修改？</h4>
								</div>
								<div className="certification-method-a">
									<p>
										实名认证成功后，信息无法修改
									</p>						
								</div>
								<div className="certification-xiugai-q">
									<h4>非中国大陆居民如何实名认证？</h4>
								</div>
								<div className="certification-method-a">
									<p>
										实名认证目前仅支持中国大陆居民身份，港澳台及海外用户无法进行实名认证
									</p>						
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = HelpCertification;