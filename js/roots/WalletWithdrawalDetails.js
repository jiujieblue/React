var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var WalletWithdrawalDetails = require('../components/WalletWithdrawalDetails.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<WalletWithdrawalDetails />
	</Container>,
	document.getElementById('app')
	);