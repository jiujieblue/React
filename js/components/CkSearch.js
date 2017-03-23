require('../../less/ck-search.less');
var React = require('react');

var CkSearch = React.createClass({
	getInitialState: function() {
		return {
			type: 'p'
		}
	},

	render: function() {
		return (
			<div className="ck-search">
				<form action={'/cooka-search/search' + (this.state.type === 'p' ? 'Product' : 'Store' )} method="GET">
					<div className="input-group input-group-lg">
						<span className="input-group-addon ck-search-select-wrap">
							<select className="ck-search-select" onChange={this._changeType}>
								<option value="p">商品</option>
								<option value="s">店铺</option>
							</select>
						</span>
						<input type="search" name="query" className="form-control" placeholder="搜索关键字..."/>
						<span className="input-group-btn">
							<button type="submit" className="btn btn-primary">
								搜索
							</button>
						</span>
					</div>
				</form>
			</div>
			);
	},

	_changeType: function(e) {
		this.setState({
			type: e.target.value
		});
	}
});

module.exports = CkSearch;