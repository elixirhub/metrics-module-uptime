var Monitor = require('ping-monitor');

var down_error = 0;
var up = 0; 
var start = datestring ();
/**
 * Object to check the uptime in a website.
 * @constructor
 */

var Uptime = function () {
 
}

/**
 * Uptime module.
 * @module lib/Uptime
 */

Uptime.prototype ={
 /**
 * Install the component and dependencies
 * @param {string} website - the url of the website to be monitored (server, repository, etc).
 * @param {numeric} interval - time interval (in minutes) for checking website availability.
 * @param {numeric} timescan - time in minutes for checking  website availability.
 * @param {function} callback - Callback function (return mesage).
 * @memberOf  Uptime
 */
   
run: function (website,interval,timescan,callback){
	var end = datestring();
  	
	var monitor = new Monitor({
	    website: website,//'http://www.uniprot.org/downloads',
	    interval: interval // time interval(in minutes) for checking website availability
	});
 
	monitor.on('error', function (msg) {
	    console.log(msg); 
	    down_error += 1;
	    end = datestring();
	    if( doneTimescan(start, end, timescan) ) { monitor.stop();}
	});

	monitor.on('down', function (res) {
	    //console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
	    down_error += 1;
	    end = datestring();
	    if( doneTimescan(start, end, timescan) ) { monitor.stop();}
	});
	 
	monitor.on('up', function (res) {
	    //console.log('Yay!! ' + res.website + ' is up.'); 
	    up += 1; 
	    end = datestring();
	    if( doneTimescan(start, end, timescan) ) { monitor.stop();}
	});
	monitor.on('stop', function (website) {
	    //console.log(website + ' monitor has stopped.');
	    //console.log('down and errors: ' + down_error);
	    //console.log('ups: ' + up);
		var msg = 'down and errors: ' + down_error + ' ups: ' + up;
		callback(msg);
	});

 }

}
 
/** Do accesible module Uptime */
module.exports = Uptime;
 	
 


function datestring () {
  return Date.now();
};

function doneTimescan(start, end, timescan){
	//console.log(start + '-' + end);
	if((end-start)/1000 >= timescan*60) return true;
	else return false;
}
