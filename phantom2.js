var casper = require("casper").create();

function goTo(url) {
	casper.thenOpen(url);
}

casper.options.waitTimeout = 1000;

casper.start('http://www.masstechportal.org/IP7174.aspx');

casper.then(function(){
  if (this.exists('span#lblIPID')) {
        this.echo(casper.fetchText('span#lblIPID'));
        this.open('http://www.masstechportal.org/IP7220.aspx');
        if (this.exists('span#lblIPID')) {
          this.echo(casper.fetchText('span#lblIPID'));
        }
        else {
          this.echo('Not working');
        }
    }
  else {
    this.echo('Not working');
  }

  casper.exit();
})

casper.run();
