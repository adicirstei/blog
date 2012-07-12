

	var crypto = require('crypto');
	var shasum = crypto.createHash('sha1');
	shasum.update('ad13r3');
	var d = shasum.digest('hex');
	console.log(d);