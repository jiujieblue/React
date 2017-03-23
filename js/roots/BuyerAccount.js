var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var BuyerAccount = require('../components/BuyerAccount.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<BuyerAccount />
	</Container>,
	document.getElementById('app')
	);