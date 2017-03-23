var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var HelpSide = require('../components/HelpSide.js');

ReactDOM.render(
	<Container>
		<HelpSide />
	</Container>,
	document.getElementById('app')
	);