var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Page = require('../components/Page.js');

ReactDOM.render(
	<Container>
		<Page />
	</Container>,
	document.getElementById('app')
	);