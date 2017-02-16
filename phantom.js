var casper = require('casper').create();
var links;

function getLinks() {
	var links = document.querySelectorAll('tr td a.mtsplink');
	return Array.prototype.map.call(links, function (e) {
		return e.getAttribute('href')
	});
}

casper.start('http://www.masstechportal.org/default.aspx', function(){
	casper.then(function() {
		links = this.evaluate(getLinks);
		for (var i in links) {
			console.log(links[i]);
		}
		casper.done();
	});
});

casper.run();
