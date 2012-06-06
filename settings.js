
var fs = require('fs');
var settings, content;

content = fs.readFileSync(__dirname + '/settings.json', 'utf8');
console.log(content);
settings = JSON.parse(content);
console.log(settings);

module.exports = exports = settings;