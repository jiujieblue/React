var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var UserCenter = require('../components/UserCenter.js');

ReactDOM.render(
	<Container simple='BuyerHeader'>
		<UserCenter />
	</Container>,
	document.getElementById('app')
	);