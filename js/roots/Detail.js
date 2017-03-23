var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Detail = require('../components/Detail.js');

ReactDOM.render(
	<Container>
		<Detail />
	</Container>,
	document.getElementById('app')
	);