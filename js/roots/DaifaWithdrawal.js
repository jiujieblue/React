var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var DaifaWithdrawal = require('../components/DaifaWithdrawal.js');

ReactDOM.render(
	<Container simple='DaifaHeader'>
		<DaifaWithdrawal />
	</Container>,
	document.getElementById('app')
	);