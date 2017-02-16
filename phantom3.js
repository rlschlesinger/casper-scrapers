var casper = require("casper").create({
waitTimeout: 10000,
stepTimeout: 10000,
verbose: true,
logLevel: 'error',
pageSettings: {
webSecurityEnabled: false
},
    onWaitTimeout: function() {
          this.echo('** Wait-TimeOut **');
    },
    onStepTimeout: function() {
        this.echo('** Step-TimeOut **');
    }
});

function getLinks() {
	var links = document.querySelectorAll('tr td a.mtsplink');
	return Array.prototype.map.call(links, function (e) {
		return e.getAttribute('href')
	});
}

casper.start();

casper.open('http://www.masstechportal.org/default.aspx');

casper.then(function() {
	this.echo(this.getTitle());
	var links = this.evaluate(getLinks);
	var counter = links.length;
	this.click('tr td a.mtsplink');
	this.echo(this.fetchText('span#lblIPID'));
	// for (var i in links) {
	// 	var url = 'http://www.masstechportal.org/' + links[i];
	// 	console.log(url);
	// }
	// console.log(links.length)
	casper.done();
});

casper.run();
