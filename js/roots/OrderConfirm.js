var React = require('react');
var ReactDOM = require('react-dom');
var Container = require('../components/Container.js');
var OrderConfirm = require('../components/OrderConfirm.js');

ReactDOM.render(
	<Container>
		<OrderConfirm/>
	</Container>,
	document.getElementById('app')
	);