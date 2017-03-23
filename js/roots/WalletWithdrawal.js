var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var WalletWithdrawal = require('../components/WalletWithdrawal.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<WalletWithdrawal />
	</Container>,
	document.getElementById('app')
	);