require('../../less/ck-pagination.less');
var React = require('react');
var qs = require('qs');
var _ = require('lodash');

var CkPagination = React.createClass({
	propTypes: {
		hasNextPage: React.PropTypes.bool.isRequired,
		hasPreviousPage: React.PropTypes.bool.isRequired,
		navigatepageNums: React.PropTypes.array.isRequired,
		nextPage: React.PropTypes.number.isRequired,
		pageNum: React.PropTypes.number.isRequired,
		pages: React.PropTypes.number.isRequired,
		prePage: React.PropTypes.number.isRequired,
		query: React.PropTypes.object
	},

	render: function() {
		var pathname = window.location.pathname;
		var npn = this.props.navigatepageNums;

		var items = this.props.navigatepageNums.map(function(item, index) {
			return (
				<li key={index} className={item === this.props.pageNum ? 'active' : ''}>
					{
						item === this.props.pageNum ?
						<span>{item}</span>
						:
						<a href={pathname + '?' + qs.stringify(_.assign({}, this.props.query, {page: item}))}>{item}</a>
					}
				</li>
				);
		}, this);

		console.log(this.props)
		return (
			<nav className="ck-pagination">
				<ul className="pagination">
					<li className={this.props.hasPreviousPage ? '' : 'disabled'}>
						{
							this.props.hasPreviousPage ?
							<a href={pathname + '?' + qs.stringify(_.assign({}, this.props.query, {page: this.props.prePage}))}>
								<span className="icon-xiangqian" />
							</a>
							:
							<span title="没有上一页">
								<span className="icon-xiangqian" />
							</span>
						}
					</li>
					{items}
					{
						npn[npn.length - 1] < this.props.pages ?
						<li>
							<span>
								...
							</span>
						</li> : null
					}

					{
						npn[npn.length - 1] < this.props.pages ?
						<li>
							<a href={pathname + '?' + qs.stringify(_.assign({}, this.props.query, {page: this.props.pages}))}>
								{this.props.pages}
							</a>
						</li> : null
					}

					<li className={this.props.hasNextPage ? '' : 'disabled'}>
						{
							this.props.hasNextPage ?
							<a href={pathname + '?' + qs.stringify(_.assign({}, this.props.query, {page: this.props.nextPage}))}>
								<span className="icon-xianghou" />
							</a>
							:
							<span title="没有下一页">
								<span className="icon-xianghou" />
							</span>
						}
					</li>

					<li>
						<span className="ck-pagination-text">
							到
						</span>
					</li>
					<li>
						<input type="" className="ck-pagination-input" ref="pp"/>
					</li>
					<li>
						<span className="ck-pagination-text">
							页
						</span>
					</li>
					<li>
						<a href="#" onClick={this._go}>
							确定
						</a>
					</li>
				</ul>
			</nav>
			);
	},

	_go: function(e) {
		e.preventDefault();
		var val = this.refs.pp.value;
		if (!val) {
			return;
		}

		if (!/^[1-9][\d]*$/.test(val)) {
			return;
		}

		if (parseInt(val) > this.props.pages) {
			return;
		}

		window.location.href = window.location.pathname + '?' + qs.stringify(_.assign({}, this.props.query, {page: val}));
	}
});

module.exports = CkPagination;