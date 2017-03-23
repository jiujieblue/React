require('../../less/user-footprint.less');
var React = require('react');
var UserFootprintUtil=require('../utils/UserFootprintUtil.js');
var Modal = require('react-modal');
var BuyerSide = require('./BuyerSide.js');
var UserFootprint = React.createClass({

	getInitialState:function(){
		return{
			data:'',
			isCurrentHtml:true,
			modalIsOpen: false,
			url:'',
			modalHtml:'',
			traces:[]
		}
	},
	openModal: function(e) {
		e.preventDefault();
		var data=e.target.getAttribute('data-del');
		var radioChe=this.refs.radio.checked;
		if(data=='zuji'){
			if(radioChe){
				this.setState({
					modalIsOpen: true,
					url:'/cooka-product-web/clearMyProductTrace',
					modalHtml:''
				});
			}
		}else{
			this.setState({
				modalIsOpen: true,
				url:'/cooka-product-web/deleteInvalidProducts',
				modalHtml:'失效'
			});
		}
	},
	del:function(){
		var me=this;
		UserFootprintUtil.submit('null',this.state.url,function(res){
				if(res=="success"){
					location.reload();
					// me.setState({
					// 	isCurrentHtml:false
					// });
				}
		});	
		UserFootprintUtil.getData('/cooka-product-web/myProductTrace',function(res){
			me.setState({
				data:res
			})
		});
		this.setState({
			modalIsOpen: false
		});
	},
	closeModal:function(){
		this.setState({
			modalIsOpen: false
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
	componentWillMount:function(){
		var me=this;
		UserFootprintUtil.getData('/cooka-product-web/myProductTrace',function(res){
			me.setState({
				data:res,
				traces:res.traces
			})
		})
	},

	handleShanchuClick:function(e){
		var me = this;
		var ref=e.target.getAttribute('data');
		var productId=this.refs[ref].getAttribute('data-productId');
		location.reload();
		UserFootprintUtil.submit({productId:productId},'/cooka-product-web/deleteProductTrace',function(res){
			// if(res=="success"){
			// 	me.refs[ref].parentElement.removeChild(me.refs[ref]);
			// 	var divParent='div'+ref.slice(0,-1);
			// 	var ulParent='ul'+ref.slice(0,-1);
			// 	if(me.refs[ulParent].childNodes.length==0){
			// 		me.refs[divParent].parentElement.removeChild(me.refs[divParent]);
			// 	}
			// }
		});
		UserFootprintUtil.getData('/cooka-product-web/myProductTrace',function(res){
			me.setState({
				data:res,
				traces:res.traces
			})
		})
	},

	handleQuanxuanClick:function(){
		var check=this.refs.radio.checked;
		if(check){
			this.refs.radio.checked=false;
		}else{
			this.refs.radio.checked=true;
		}
	},

	render: function () {
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
		var me=this;
		var currentHtml=[];
		var idNum1=0;
		for(var i in this.state.data.traces){
			var idStr1='danxuan';
			var idNum2=0;
			idStr1+=(++idNum1);
			currentHtml.push(
					<div key={i} ref={'div'+idStr1} className="user-footprint-product-list">
						<p>
							<b>{i}</b>浏览了
							<span>{this.state.data.traces[i].length}</span>件宝贝
						</p>
						<ul ref={'ul'+idStr1}>
							{this.state.data.traces[i].map(function(item,index){
								var idStr2='danxuan';
								idStr2+=idNum1+''+(++idNum2)
								return(
									<li key={index} ref={idStr2} data-productId={item.productId}>
										<div>
											<a href="#"><img src={item.imageUrl}/></a>
											<i className="icon-shanchu" data={idStr2} onClick={me.handleShanchuClick}></i>
											<b className="icon-dianpu" data={idStr2} onClick={me.handleDianpuClick}></b>
										</div>
										<p><a href="">{item.title}</a></p>
										<span>￥{item.price}</span>
									</li>
								);
							})}
						</ul>
					</div>)
		}
		return (
			<div className="row">
				<div className="col-md-2">
					<div>
						<BuyerSide />
					</div>
				</div>
				<div className="col-md-10">
					<div className='user-footprint'>
						<div>
							<Modal
								isOpen={this.state.modalIsOpen}
								onAfterOpen={this.afterOpenModal}
								onRequestClose={this.closeModal}
								style={mStyle} >

								<h3 ref="subtitle">提示</h3>
								<h3 ref="cont"><span style={{marginRight:'20px',marginLeft:'10px',marginTop:'-5px',color:'red'}} className="icon-wenhao"></span>确定要删除全部{this.state.modalHtml}足迹吗？</h3>
								<div ref="caozuo">
									<button ref="close" onClick={this.closeModal}>关闭</button>
									<button ref="yes" onClick={this.del}>确定</button>
								</div>
							</Modal>
						</div>
						<div className="user-footprint-current">
							<p><span>当前位置：其他 > </span>我的足迹</p>
							<ul>
								<li>全部(12)</li>
								<li>免邮(22)</li>
								<li>优惠()</li>
							</ul>
						</div>
						<div className="user-footprint-product" style={{display:this.state.data?'block':'none'}}>
							<div className="user-footprint-product-quanshan">
								<ul>
									<li>
										您有<span>{this.state.data.invalidProductCount}</span>个失效商品
										<a href="#" data-del='shixiao' onClick={this.openModal}>全部删除</a>
									</li>
									<li>
										<input ref='radio' type="radio" name="allChoose"/>
										<p onClick={this.handleQuanxuanClick}>全选</p>
										<p><span className="icon-shanchu"></span><a data-del='zuji' href="#" onClick={this.openModal}>删除</a></p>
									</li>
								</ul>
							</div>
							{currentHtml}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = UserFootprint;