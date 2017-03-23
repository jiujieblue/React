var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var HotSalePage = require('../components/HotSalePage.js');

ReactDOM.render(
	<Container>
		<HotSalePage/>
	</Container>,
	document.getElementById('app')
	);