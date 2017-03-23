require('../../less/seller-member.less');
var React = require('react');
var SellerSide = require('./SellerSide.js');
var SellerMember = React.createClass({
	getInitialState:function(){
		return{
			type:1
		}
	},
	_type:function(t){
		var me = this;
		me.setState({
			type:t
		})
	},
	render: function () {
		return (
			<div className="row">
				<div className="col-md-2">
					<SellerSide/>
				</div>
				<div className="col-md-10">
					<div className="seller-member">
						<div className="seller-member-location">
							当前位置：交易中心 > 会员管理
						</div>
						<div className="seller-member-menu">
							<form className="menu-buyer" style={{display:this.state.type == 1 ? 'block' : 'none'}}>
								<div className="menu-buyer-buyer">
									<label><span className="em"></span><span className="em"></span>我的买家:</label>
									<input />
								</div>
								<div className="menu-buyer-time">
									<label>时间:</label>
									<input /> - <input />
								</div>
								<div className="menu-buyer-recent">
									<label>最近消费渠道:</label>
									<input />
								</div>
								<div className="menu-buyer-total">
									<label>累计交易金额:</label>
									<input />
								</div>
								<div className="menu-buyer-submit">
									<button type="submit">查找</button>
								</div>
							</form>
							<form className="menu-member" style={{display:this.state.type == 2 ? 'block' : 'none'}}>
								<div className="menu-member-buyer">
									<label><span className="em"></span><span className="em"></span>会员:</label>
									<input />
								</div>
								<div className="menu-member-time">
									<label>时间:</label>
									<input /> - <input />
								</div>
								<div className="menu-member-recent">
									<label>发展渠道:</label>
									<input />
								</div>
								<div className="menu-member-total">
									<label>交易总金额:</label>
									<input />
								</div>
								<div className="menu-member-submit">
									<button type="submit">查找</button>
								</div>
							</form>
							<form className="menu-vip" style={{display:this.state.type == 3 ? 'block' : 'none'}}>
								<div className="menu-vip-buyer">
									<label><span className="em"></span><span className="em_5"></span><span className="em"></span>VIP:</label>
									<input />
								</div>
								<div className="menu-vip-time">
									<label>时间:</label>
									<input /> - <input />
								</div>
								<div className="menu-vip-recent">
									<label>发展渠道:</label>
									<input />
								</div>
								<div className="menu-vip-total">
									<label>交易总金额:</label>
									<select>
										<option>111</option>
										<option>222</option>
										<option>333</option>
									</select>
									<label>状态:</label>
									<select>
										<option>111</option>
										<option>222</option>
										<option>333</option>
									</select>
								</div>
								<div className="menu-vip-submit">
									<button type="submit">查找</button>
								</div>
							</form>
						</div>
						<div className="seller-member-mod">
							<ul>
								<li className={this.state.type == 1 ? 'active' : ''} onClick={this._type.bind(this,1)}>我的买家</li>
								<li className={this.state.type == 2 ? 'active' : ''} onClick={this._type.bind(this,2)}>我的会员</li>
								<li className={this.state.type == 3 ? 'active' : ''} onClick={this._type.bind(this,3)}>我的VIP</li>
							</ul>
						</div>
						<div className="seller-member-detail">
							<table className="detail-buyer" style={{display:this.state.type == '1' ? 'block' : 'none'}}>
								<thead>
									<tr>
										<td>序号</td>
										<td>我的买家</td>
										<td>最近消费时间</td>
										<td>最近消费渠道</td>
										<td>最近交易金额</td>
										<td>累计交易总金额</td>
										<td>标记</td>
										<td className="caozuo">操作</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>12345612345</td>
										<td>
											<p>2016-06-06</p>
											<p>10:25:00</p>
										</td>
										<td>快捷支付</td>
										<td>1000.00</td>
										<td>1000.00</td>
										<td>会员,VIP</td>
										<td></td>
									</tr>
									<tr>
										<td>2</td>
										<td>12345612345</td>
										<td>
											<p>2016-06-06</p>
											<p>10:25:00</p>
										</td>
										<td>快捷支付</td>
										<td>1000.00</td>
										<td>1000.00</td>
										<td>会员</td>
										<td><a>设为VIP</a></td>
									</tr>
									<tr>
										<td>3</td>
										<td>12345612345</td>
										<td>
											<p>2016-06-06</p>
											<p>10:25:00</p>
										</td>
										<td>快捷支付</td>
										<td>1000.00</td>
										<td>1000.00</td>
										<td></td>
										<td><a>设为VIP</a></td>
									</tr>
								</tbody>
							</table>

							<table className="detail-member" style={{display:this.state.type == '2' ? 'block' : 'none'}}>
								<thead>
									<tr>
										<td>序号</td>
										<td>会员</td>
										<td>会员编号</td>
										<td>发展时间</td>
										<td>发展渠道</td>
										<td>交易总金额</td>
										<td className="caozuo">操作</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>12345612345</td>
										<td>VIP12345</td>
										<td>快捷支付</td>
										<td>1000.00</td>
										<td>1000.00</td>
										<td></td>
									</tr>
									<tr>
										<td>1</td>
										<td>12345612345</td>
										<td>VIP12345</td>
										<td>快捷支付</td>
										<td>1000.00</td>
										<td>1000.00</td>
										<td></td>
									</tr>
								</tbody>
							</table>

							<table className="detail-vip" style={{display:this.state.type == '3' ? 'block' : 'none'}}>
								<thead>
									<tr>
										<td>序号</td>
										<td>VIP</td>
										<td>VIP编号</td>
										<td>加入时间</td>
										<td>状态</td>
										<td>交易总金额</td>
										<td className="caozuo">操作</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>12345612345</td>
										<td>VIP12345</td>
										<td>
											<p>2016-06-06</p>
											<p>18:00:00</p>
										</td>
										<td>生效</td>
										<td>1000.00</td>
										<td>生效</td>
									</tr>
									<tr>
										<td>1</td>
										<td>12345612345</td>
										<td>VIP12345</td>
										<td>
											<p>2016-06-06</p>
											<p>18:00:00</p>
										</td>
										<td>生效</td>
										<td>1000.00</td>
										<td>失效</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = SellerMember;