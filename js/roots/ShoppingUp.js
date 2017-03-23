var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var ShoppingUp = require('../components/ShoppingUp.js');

ReactDOM.render(
	<Container simple='SellerHeader'>
		<ShoppingUp />
	</Container>,
	document.getElementById('app')
	);