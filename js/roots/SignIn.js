var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SignIn = require('../components/SignIn.js');

ReactDOM.render(
	<Container simple={1} useContainer={false} title="欢迎登录">
		<SignIn />
	</Container>,
	document.getElementById('app')
	);