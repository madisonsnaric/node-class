let express = require('express'); 

let app = express();

app.get('/api/genres', function(request, response) {
	response.json([1, 2, 3]); 
});

app.listen(8000); 