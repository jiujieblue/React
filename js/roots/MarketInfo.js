var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var MarketInfo = require('../components/MarketInfo.js');

ReactDOM.render(
	<Container simple='SellerHeader'>
		<MarketInfo />
	</Container>,
	document.getElementById('app')
);