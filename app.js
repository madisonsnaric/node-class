let express = require('express'); 
let knex = require('knex'); 
const querystring = require('querystring'); 

let app = express();

app.get('/api/genres', function(request, response) {
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	})

	connection.select().from('genres').then((genres) => {
		response.json(genres); 
	}); 
});

app.get('/api/genres/:id', function(request, response) {
	let id = request.params.id; 


	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	}); 

	connection
		.select()
		.from('genres')
		.where('GenreId', id)
		.first()
		.then((genre) => {
			if(genre) {
				response.json(genre);
			} else {
				response.status(404).json({
					error: `Genre ${id} not found`
				});
			}
	}); 
});

app.get('/api/artists', function(request, response) {
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	})

	// connection.select().from('artists').then((artists) => {
	// 	response.json(artists); 
	// }); 

	let filter = req.query.filter; 

	if (!filter) {
		connection
			.select()
			.from('artists')
			.then((artists) => {
			response.json(artists);
		});
	}
	else {
		connection
			.select()
			.from('artists')
			.where('Name', 'like', filter)
			.then((artists) => {
				response.json(artists);
			}); 
	}

}); 

// get /api/artists?filter=a
//reg.query.filter

// app.get('api/artists?filter=a'), function(request, response) {
// 	//let id = request.params.id; 

// 	let filter = reg.query.filter; 

// 	let connection = knex({
// 		client: 'sqlite3',
// 		connection: {
// 			filename: 'chinook.db'
// 		}
// 	})

// 	connection 
// 		.select()
// 		.from('artists')
// 		.where('Name', 'like', filter)
// 		.then((artists) => {
// 			response.json(artists);
// 		}); 
// }; 



app.listen(process.env.PORT || 8000); 