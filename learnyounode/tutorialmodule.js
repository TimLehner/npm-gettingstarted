function filteredLS(directory, filter, callback) {
	var fs = require('fs')
	var path = require('path')
	var buf = fs.readdir(directory, readDirCallback);

	function readDirCallback(err, list) {
		if (err) {
			return callback(err); // early return
		}
		var matching = [];
		for (var i = 0; i < list.length; i++) {
			if (path.extname(list[i]).includes(filter)) {
				matching.push(list[i]);
			}
		}
		callback(null, matching);
	}
}

module.exports = filteredLS;