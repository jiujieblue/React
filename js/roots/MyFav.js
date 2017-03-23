var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var MyFav = require('../components/MyFav.js');

ReactDOM.render(
	<Container>
		<MyFav />
	</Container>,
	document.getElementById('app')
	);