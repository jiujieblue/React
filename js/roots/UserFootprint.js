var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var UserFootprint = require('../components/UserFootprint.js');

ReactDOM.render(
	<Container  simple='BuyerHeader'>
		<UserFootprint />
	</Container>,
	document.getElementById('app')
	);