var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Search = require('../components/Search.js');

ReactDOM.render(
	<Container>
		<Search/>
	</Container>,
	document.getElementById('app')
	);