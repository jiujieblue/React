var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var EditSignInPwd = require('../components/EditSignInPwd.js');

ReactDOM.render(
	<Container>
		<EditSignInPwd/>
	</Container>,
	document.getElementById('app')
	);