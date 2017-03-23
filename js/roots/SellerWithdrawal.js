var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerWithdrawal = require('../components/SellerWithdrawal.js');

ReactDOM.render(
	<Container >
		<SellerWithdrawal simple='SellerHeader'/>
	</Container>,
	document.getElementById('app')
	);