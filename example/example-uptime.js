var UPT = require('../lib/uptime.js');
var uptime = new UPT();

var url = 'http://www.uniprot.org/downloads';
var interval = 1;//minutes 
var timescan = 3; //minutes

uptime.run(url,interval,timescan,function (msg) {
	console.log(msg)
});


 	
 
