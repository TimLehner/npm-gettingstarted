var http = require('http');
var map = require('through2-map');
var parser = require('url');

var endpoints = {
	"/api/parsetime" : parsetime,
	"/api/unixtime"	 : unixtime
}


var server = http.createServer(function(req, res) {
	if (req.method == 'GET') {
		handleGET(req, res);
	} else {
		res.statusCode = 405;
		res.setHeader("Allow", "GET");
		res.end();
	}
});

function handleGET(req, res) {
	var path = parser.parse(req.url, true);
	var endpointsArr = Object.keys(endpoints);
	var foundEndpoint = false;
	for (var i = 0; i < endpointsArr.length; i++) {
		if (endpointsArr[i] == path.pathname) {
			foundEndpoint = true;
			res.writeHead(200, { 'Content-Type': 'application/json' });
			endpoints[endpointsArr[i]](path, res);
		}
	}
	if (!foundEndpoint) {
		res.statusCode = 404;
		res.end();
	}
}

function parsetime(parsedReq, res) {
	var givenDateTime = parsedReq.query.iso;
	// givenDateTime of format YYYY-MM-DDThh:mm:ss.msZ
	// givenDateTime.split("T") : [YYYY-MM-DD, hh:mm:ss.msZ]
	// .split(".")				: [hh:mm:ss, .msZ]
	var timeOnly = givenDateTime.split("T")[1].split(".")[0].split(":");
	var rspBody = {hour : parseInt(timeOnly[0]), minute : parseInt(timeOnly[1]), second : parseInt(timeOnly[2])};
	res.end(JSON.stringify(rspBody));
}	

function unixtime(parsedReq, res) {
	var givenDateTime = parsedReq.query.iso;
	var rspBody = {unixtime : parseInt(new Date(givenDateTime).getTime().toString())};
	res.end(JSON.stringify(rspBody));
}

server.listen(process.argv[2]);