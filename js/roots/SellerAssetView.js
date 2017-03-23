var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SellerAssetView = require('../components/SellerAssetView.js');

ReactDOM.render(
	<Container simple='SellerHeader'>
		<SellerAssetView />
	</Container>,
	document.getElementById('app')
	);