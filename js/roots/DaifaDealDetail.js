var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('../components/Container.js');
var DaifaDealDetail = require('../components/DaifaDealDetail.js');

ReactDOM.render(
	<Container simple='DaifaHeader'>
		<DaifaDealDetail />
	</Container>,
	document.getElementById('app')
	);