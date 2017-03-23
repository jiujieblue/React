var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerPublic = require('../components/SellerPublic.js');

ReactDOM.render(
	<Container simple='SellerHeader'>
		<SellerPublic />
	</Container>,
	document.getElementById('app')
	);