var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var ResetPswd = require('../components/ResetPswd.js');

ReactDOM.render(
	<Container simple={true} title="重置密码" useTop={false}>
		<ResetPswd />
	</Container>,
	document.getElementById('app')
	);