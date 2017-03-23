var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var WalletWithdrawalRecord = require('../components/WalletWithdrawalRecord.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<WalletWithdrawalRecord />
	</Container>,
	document.getElementById('app')
	);