var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var HelpCertification = require('../components/HelpCertification.js');

ReactDOM.render(
	<Container simple='HelpHeader'>
		<HelpCertification />
	</Container>,
	document.getElementById('app')
	);