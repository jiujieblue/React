var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SignUp = require('../components/SignUp.js');

ReactDOM.render(
	<Container simple={true} title="欢迎注册" useTop={false}>
		<SignUp />
	</Container>,
	document.getElementById('app')
	);