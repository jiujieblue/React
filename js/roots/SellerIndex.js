var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerIndex = require('../components/SellerIndex.js');

ReactDOM.render(
	<Container>
		<SellerIndex />
	</Container>,
	document.getElementById('app')
	);