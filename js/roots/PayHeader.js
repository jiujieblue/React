var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var PayHeader = require('../components/PayHeader.js');

ReactDOM.render(
	<Container>
		<PayHeader />
	</Container>,
	document.getElementById('app')
	);