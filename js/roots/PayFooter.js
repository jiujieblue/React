var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var PayFooter = require('../components/PayFooter.js');

ReactDOM.render(
	<Container>
		<PayFooter />
	</Container>,
	document.getElementById('app')
	);