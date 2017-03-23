var fs = require('fs');
var prompt = require('prompt');

function camelToDash(p) {
	return p.replace(/([A-Z])/g, '-$1').slice(1).toLowerCase();
}

function camelToUnderscore(p) {
	return p.replace(/([A-Z])/g, '_$1').slice(1).toLowerCase();
}

function camelToLowerCamel(p) {
	return p.slice(0, 1).toLowerCase() + p.slice(1);
}

function createRoot(pName) {
	// create root
	var rootTemplate = '' +
		'var React = require(\'react\');\n' +
		'var ReactDOM = require(\'react-dom\');\n\n' +
		'var Container = require(\'../components/Container.js\');\n' +
		'var ' + pName + ' = require(\'../components/' + pName + '.js\');\n\n' +
		'ReactDOM.render(\n' +
		'\t<Container>\n' +
		'\t\t<' + pName + ' />\n' +
		'\t</Container>,\n' +
		'\tdocument.getElementById(\'app\')\n' +
		'\t);';
	fs.writeFileSync('./js/roots/' + pName + '.js', rootTemplate, 'utf8');
	console.log('create file: /js/roots/' + pName + '.js');
}

function createComponent(pName) {
	// create component
	var componentTemplate = '' +
		'require(\'../../less/' + camelToDash(pName) + '.less\');\n' +
		'var React = require(\'react\');\n' +
		'var ' + pName + ' = React.createClass({\n' +
		'\trender: function () {\n' +
		'\t\treturn (\n' +
		'\t\t\t<div className="row">\n' +
		'\t\t\t\t<div className="col-md-12">\n' +
		'\t\t\t\t\t<div className="' + camelToDash(pName) + '">\n' +
		'\t\t\t\t\t\t<h1>this is ' + pName + '.js</h1>\n' +
		'\t\t\t\t\t</div>\n' +
		'\t\t\t\t</div>\n' +
		'\t\t\t</div>\n' +
		'\t\t\t);\n' +
		'\t}\n' +
		'});\n\n' +
		'module.exports = ' + pName + ';';

	fs.writeFileSync('./js/components/' + pName + '.js', componentTemplate, 'utf8');
	console.log('create file: /js/components/' + pName + '.js');
}

function createLess(pName) {
	// create less
	var lessTemplate = '' +
		'@import "./public.less";\n' +
		'.' + camelToDash(pName) + ' {\n' +
		'\tborder: 10px solid @ck-main;\n' +
		'}';

	fs.writeFileSync('./less/' + camelToDash(pName) + '.less', lessTemplate, 'utf8');
	console.log('create file: /less/' + camelToDash(pName) + '.less');
}

function createHtml(pName) {
	// create html
	var htmlTemplate = '' +
		'<!DOCTYPE html>\n' +
		'<html>\n' +
		'<head>\n' +
		'\t<meta charset="UTF-8">\n' +
		'\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
		'\t<title>柯咔服装网</title>\n' +
		'\t<link href="./build/' + camelToLowerCamel(pName) + '.css" rel="stylesheet"></head>\n' +
		'<body>\n' +
		'\t<div id="app">\n' +
		'\t\t<h1 style="text-align:center;font-family:Helvetica">加载中，请稍候...</h1>\n' +
		'\t</div>\n' +
		'\t<script type="text/javascript" src="./build/' + camelToLowerCamel(pName) + '.js"></script></body>\n' +
		'</html>\n';

	fs.writeFileSync('./' + camelToUnderscore(pName) + '.html', htmlTemplate, 'utf8');
	console.log('create file: /' + camelToUnderscore(pName) + '.html');
}

function createUtil(pName) {
	// create util
	var utilTemplate = '' +
		'var request = require(\'superagent\');\n' +
		'var C = require(\'../C.js\');\n' +
		'module.exports = {\n' +
		'\tmyFunctionName: function(cb) {\n' +
		'\t\trequest\n' +
		'\t\t\t.get(\'/some/end/point\')\n' +
		'\t\t\t.use(C.ajaxAuth())\n' +
		'\t\t\t.end(function(err, res) {\n' +
		'\t\t\t\tif (err) {\n' +
		'\t\t\t\t\treturn err;\n' +
		'\t\t\t\t}\n' +
		'\t\t\t\tcb(JSON.parse(res.text));\n' +
		'\t\t\t});\n' +
		'\t}\n' +
		'}';

	fs.writeFileSync('./js/utils/' + pName + 'Util.js', utilTemplate, 'utf8');
	console.log('create file: /' + pName + 'Util.js');
}

function updateWebpack() {
	var wbTemplate = fs.readFileSync('./webpack_template', 'utf8');
	var wpTemplate = fs.readFileSync('./webpack_production_template', 'utf8');
	fs.readdir('./js/roots/', function(err, files) {
		var entry = files.map(function(file) {
			return '\t\t' + camelToLowerCamel(file.slice(0, -3)) + ': \'./js/roots/' + file + '\'';
		}).join(',\n');
		wbTemplate = wbTemplate.replace(/__ENTRY__/, entry);
		wpTemplate = wpTemplate.replace(/__ENTRY__/, entry);
		
		fs.writeFileSync('./webpack.build.js', wbTemplate, 'utf8');
		fs.writeFileSync('./webpack.production.js', wpTemplate, 'utf8');
	});
}

function go(pName) {
	createRoot(pName);
	createComponent(pName);
	createLess(pName);
	createHtml(pName);
	createUtil(pName);
	updateWebpack();
}

prompt.start();
prompt.get(['PageName'], function(err, result) {
	if (err) {
		throw err;
	}

	var pName = result.PageName;

	fs.access('./js/roots/' + pName + '.js', fs.F_OK, function(err) {
		if (err) {
			go(pName);
		}
		else {
			console.log('页面已存在');
		}
	});
});