var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Index = require('../components/Index.js');

ReactDOM.render(
	<Container>
		<Index />
	</Container>,
	document.getElementById('app')
	);