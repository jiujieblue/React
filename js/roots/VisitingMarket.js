var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var VisitingMarket = require('../components/VisitingMarket.js');

ReactDOM.render(
	<Container>
		<VisitingMarket/>
	</Container>,
	document.getElementById('app')
	);