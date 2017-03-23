var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var AccountSecurityLv = require('../components/AccountSecurityLv.js');

ReactDOM.render(
	<Container>
		<AccountSecurityLv/>
	</Container>,
	document.getElementById('app')
	);