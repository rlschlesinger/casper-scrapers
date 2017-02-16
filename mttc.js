var casper = require('casper').create({
	// verbose: true,
	// logLevel: 'debug'
});


function getLinks() {
	var links = document.querySelectorAll('tr td a.mtsplink');
	return Array.prototype.map.call(links, function(e) {
		return e.getAttribute('href');
	});
}

casper.start('http://www.masstechportal.org/default.aspx', function() {
		var links = this.evaluate(getLinks);
		var data = [];
		for (var i in links) {
			casper.thenOpen('http://www.masstechportal.org/' + links[i], function() {
				// console.warn(this.fetchText('span#lblIPID'));
				data.push([
					this.fetchText('span#lblIPID'),
					this.fetchText('span#lbltype'),
					this.fetchText('span#lblTitle'),
					this.fetchText('span#lblInventor'),
					this.fetchText('span#lblSummary'),
					this.fetchText('span#lblTechtype'),
					this.fetchText('td.mtsptext a#linkUrl'),
					this.fetchText('span#lblContact'),
					this.fetchText('span#lblOrgText')
				]);
			});
		}
		casper.then(function(){
			console.log('id,ip_type,title,inventor,summary,tech_type,url,contact,organization');
			for (var i in data) {
				console.log(
					data[i]
					.map(function(value) {
						return '"' + value.replace(/"/g, '""') + '"';
					})
					.join(',')
				);
			}
		});
});

casper.run();
