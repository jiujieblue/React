var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerBank = require('../components/SellerBank.js');

ReactDOM.render(
	<Container simple='SellerHeader'>
		<SellerBank />
	</Container>,
	document.getElementById('app')
	);