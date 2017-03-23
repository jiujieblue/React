require('../../less/pagination.less');

var React = require('react');

var Pagination = React.createClass({
	getInitialState: function(){
		return {
			jumpNum:this.props.pageNum+1
		}
	},
	render: function () {
		var pageNum = this.props.pageNum;
		var hasNextPage = this.props.hasNextPage;
		var totalPages = this.props.totalPages;
		var hasPrevious = this.props.hasPrevious;
		var navigatepageNums = this.props.navigatepageNums;
		var jumpNum = this.state.jumpNum;
		var lis =[];
		console.log(pageNum);
		for(var i = 0;i<navigatepageNums.length;i++) {
			lis.push(
				<li className={pageNum===navigatepageNums[i]?"active":""} onClick={this.changePage.bind(this,navigatepageNums[i])} key={i}><a>{navigatepageNums[i]}</a></li>
				);
		}
		return (
				<nav className="ck-nav">
				  <ul className="ck-nav-pagination list-unstyled">
				    <li className={hasPrevious?"":"disabled"} onClick={hasPrevious?this.changePage.bind(this,pageNum-1):null}>
					    <a aria-label="Previous">
					   		 <span className="icon-xiangqian"></span>
					    </a>
				    </li>
				    {lis}
				    {totalPages<=6?null:(Math.max.apply(null, navigatepageNums)<totalPages?<li><a>...</a></li>:null)}
				    <li className={hasNextPage?"":"disabled"} onClick={hasNextPage?this.changePage.bind(this,pageNum+1):null}>
				      <a aria-label="Next">
				       	<span className="icon-xianghou"></span>
				      </a>
				    </li>
				  </ul>
				  共{totalPages}页，
				  到
				  <input name="jumpNum" className="ck-nav-input" value={jumpNum} onChange={this.changeInput}/>
				  页
				  <button className="btn btn-default" onClick={this.jumpPage}>确定</button>
				</nav>
			);
	},
	changeInput: function(e){
		var value = e.target.value;
		var jumpNum = e.target.name;
		var oState = this.state;
		oState[jumpNum] = value;
		console.log(oState)
		this.setState(oState);
	},
	changePage: function(pageNum){
		if (pageNum!==this.props.pageNum) {
			this.props.changePage(pageNum);
		}
	},
	jumpPage: function(){
		var pattern = /^[1-9][0-9]*$/;
		var value = this.state.jumpNum;
		if (pattern.test(value)) {
			value = parseInt(value);
			if (value<=this.props.totalPages) {
				this.changePage(value);
			}
		}
	}
});

module.exports = Pagination;