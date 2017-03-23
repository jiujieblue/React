var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var Paysuccess = require('../components/Paysuccess.js');

ReactDOM.render(
	<Container>
		<Paysuccess />
	</Container>,
	document.getElementById('app')
	);