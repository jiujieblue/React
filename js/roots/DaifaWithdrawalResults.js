var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var DaifaWithdrawalResults = require('../components/DaifaWithdrawalResults.js');

ReactDOM.render(
	<Container simple='DaifaHeader'>
		<DaifaWithdrawalResults />
	</Container>,
	document.getElementById('app')
	);