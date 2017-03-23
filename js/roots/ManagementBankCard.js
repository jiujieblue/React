var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var ManagementBankCard = require('../components/ManagementBankCard.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<ManagementBankCard />
	</Container>,
	document.getElementById('app')
	);