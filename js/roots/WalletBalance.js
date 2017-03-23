var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var WalletBalance = require('../components/WalletBalance.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<WalletBalance />
	</Container>,
	document.getElementById('app')
	);