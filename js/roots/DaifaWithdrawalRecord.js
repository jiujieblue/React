var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var DaifaWithdrawalRecord = require('../components/DaifaWithdrawalRecord.js');

ReactDOM.render(
	<Container simple='DaifaHeader'>
		<DaifaWithdrawalRecord />
	</Container>,
	document.getElementById('app')
	);