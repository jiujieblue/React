var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var DaifaBank = require('../components/DaifaBank.js');

ReactDOM.render(
	<Container simple='DaifaHeader'>
		<DaifaBank />
	</Container>,
	document.getElementById('app')
	);