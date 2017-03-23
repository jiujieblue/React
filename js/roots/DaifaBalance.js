var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var DaifaBalance = require('../components/DaifaBalance.js');

ReactDOM.render(
	<Container simple='DaifaHeader'>
		<DaifaBalance />
	</Container>,
	document.getElementById('app')
	);