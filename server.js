//This will be the entry point of the server.
const express = require('express');
const app = express();

app.listen(3000, function() {
	console.log('Listening on port 3000!');
});
