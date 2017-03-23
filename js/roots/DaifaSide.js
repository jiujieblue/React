var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var DaifaSide = require('../components/DaifaSide.js');

ReactDOM.render(
	<Container>
		<DaifaSide />
	</Container>,
	document.getElementById('app')
	);