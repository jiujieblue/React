var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var BuyerFocus = require('../components/BuyerFocus.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<BuyerFocus />
	</Container>,
	document.getElementById('app')
	);