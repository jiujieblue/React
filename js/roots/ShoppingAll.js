var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var ShoppingAll = require('../components/ShoppingAll.js');

ReactDOM.render(
	<Container>
		<ShoppingAll />
	</Container>,
	document.getElementById('app')
	);