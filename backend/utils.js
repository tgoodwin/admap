//parse.js

// var request = require('request');
// var GEO_API_ADDRESS = 'http://freegeoip.net/json/'

// var getIP = function(data) {
// 	var res = data.split(" ");
// 	if (res.length >= 6) {
// 		return res[5]; //the domain name
// 	}
// };

// var getServerLocation = function(address, callback) {
// 	var msg = GEO_API_ADDRESS + address;
// 	console.log('api request: ', msg);
// 	request(msg, function(error, response, body) {
// 		if (!error && response.statusCode == 200){
// 			return callback(body);
// 		} else {
// 			console.log('error: ', error);
// 			return callback(error);
// 		}
// 	});
// };

// module.exports = {
// 	geolocate: function(d, callback) {
// 		return getServerLocation(d, callback);
// 	}
// };

