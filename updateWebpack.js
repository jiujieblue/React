var fs = require('fs');
function camelToLowerCamel(p) {
	return p.slice(0, 1).toLowerCase() + p.slice(1);
}

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