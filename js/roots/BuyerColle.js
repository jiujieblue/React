var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var BuyerColle = require('../components/BuyerColle.js');

ReactDOM.render(
	<Container>
		<BuyerColle />
	</Container>,
	document.getElementById('app')
	);