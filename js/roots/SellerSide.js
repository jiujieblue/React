var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerSide = require('../components/SellerSide.js');

ReactDOM.render(
	<Container>
		<SellerSide />
	</Container>,
	document.getElementById('app')
	);