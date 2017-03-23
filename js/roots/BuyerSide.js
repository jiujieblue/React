var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var BuyerSide = require('../components/BuyerSide.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<BuyerSide />
	</Container>,
	document.getElementById('app')
	);