var mymodule = require('./tutorialmodule');
mymodule(process.argv[2], process.argv[3], printResult);

function printResult(err, data) {
	if (!err) {
		data.forEach( (element) => {
			console.log(element);
		} );
	}
}