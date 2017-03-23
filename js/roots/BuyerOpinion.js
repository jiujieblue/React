var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var BuyerOpinion = require('../components/BuyerOpinion.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<BuyerOpinion />
	</Container>,
	document.getElementById('app')
	);