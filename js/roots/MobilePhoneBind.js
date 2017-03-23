var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var MobilePhoneBind = require('../components/MobilePhoneBind.js');

ReactDOM.render(
	<Container>
		<MobilePhoneBind/>
	</Container>,
	document.getElementById('app')
	);