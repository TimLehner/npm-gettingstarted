var http = require('http');
var bl = require('bl');

function getThreeRequests(url1, url2, url3) {
	var output = [];
	var isSet = [false, false, false];
	collectAsync(url1, 0);
	collectAsync(url2, 1);
	collectAsync(url3, 2);
	
	function collectAsync(url, index) {	
	http.get(url, function(response) {
		response.pipe(bl(function(err, data) {
			if (err) {
				console.log("There was an error: " + err)
				return;
			}
			output[index] = data.toString();
			isSet[index] = true;
			runWhenReady(isSet, output);
		}));
	}); 
	
	function runWhenReady(isSet, output) {
		if (isSet[0] && isSet[1] && isSet[2]) {
			output.forEach( (element) => {
				console.log(element);
			});
		}
	}
}

}



getThreeRequests(process.argv[2], process.argv[3], process.argv[4])
