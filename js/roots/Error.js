var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Error = require('../components/Error.js');

ReactDOM.render(
	<Container simple='1'>
		<Error />
	</Container>,
	document.getElementById('app')
	);