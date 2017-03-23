var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var BuyerAddr = require('../components/BuyerAddr.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<BuyerAddr />
	</Container>,
	document.getElementById('app')
	);