require('../../less/buyer-opinion.less');
var React = require('react');
var ErrorMsg = require('./ErrorMsg.js');
var BuyerSide = require('./BuyerSide.js');
var BuyerOpinion = React.createClass({
	getInitialState:function(){
		return{
			error:'',
			content:'',
			contentLength:0
		}
	},
	_changeContent:function(e){
		var me = this;
		if(e.target.value.length<=30){
			me.setState({
				error:'',
				content:e.target.value,
				contentLength:e.target.value.length
			})	
		}
		else{
			me.setState({
				error:'您输入的字数过长'
			})
		}
			
	},
	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<BuyerSide />
				</div>
				<div className="col-md-10">
					<div className="buyer-opinion">
						<div className="buyer-opinion-location">
							当前位置：其他 > 意见反馈
						</div>
						<div className="buyer-opinion-form">
							<form className="form">
								<div className="form-title">
									<b>您好，感谢您提出宝贵的意见，参与到商城建设当中</b>
								</div>
								<div className="form-menu">
									<span>类型</span>
									<input id="products-opi" type="radio" name="type" />
									<label htmlFor="products-opi">产品建议</label>
									<input id="yewu-opi" type="radio" name="type" />
									<label htmlFor="yewu-opi">业务咨询</label>
									<input id="service-opi" type="radio" name="type" />
									<label htmlFor="service-opi">服务建议</label>
									<input id="other-opi" type="radio" name="type" />
									<label htmlFor="other-opi">其他</label>
								</div>
								<div className="form-content">
									<p>内容</p>
									<textarea onChange={this._changeContent} value={this.state.content}></textarea>
									<div className="limit">{this.state.contentLength}/300</div>
									<ErrorMsg error={this.state.error} />
								</div>
								<div className="form-connect">
									<span>联系方式 : </span>
									<input name="phone" placeholder="电话/邮箱" />
								</div>
								<div className="form-submit">
									<button type="submit">提交</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = BuyerOpinion;