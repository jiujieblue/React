var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Cart = require('../components/Cart.js');

ReactDOM.render(
	<Container>
		<Cart />
	</Container>,
	document.getElementById('app')
	);