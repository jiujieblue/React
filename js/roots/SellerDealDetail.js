var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerDealDetail = require('../components/SellerDealDetail.js');

ReactDOM.render(
	<Container>
		<SellerDealDetail />
	</Container>,
	document.getElementById('app')
	);