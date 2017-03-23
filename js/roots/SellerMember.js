var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerMember = require('../components/SellerMember.js');

ReactDOM.render(
	<Container>
		<SellerMember />
	</Container>,
	document.getElementById('app')
	);