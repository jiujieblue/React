var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Payment = require('../components/Payment.js');

ReactDOM.render(
	<Container simple='PayHeader'>
		<Payment />
	</Container>,
	document.getElementById('app')
	);