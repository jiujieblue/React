var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var SignUpSeller = require('../components/SignUpSeller.js');

ReactDOM.render(
	<Container simple={true} title="欢迎注册" useTop={false}>
		<SignUpSeller />
	</Container>,
	document.getElementById('app')
	);