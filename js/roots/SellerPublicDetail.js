var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerPublicDetail = require('../components/SellerPublicDetail.js');

ReactDOM.render(
	<Container>
		<SellerPublicDetail />
	</Container>,
	document.getElementById('app')
	);