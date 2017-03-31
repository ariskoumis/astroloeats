//This function is used on my AWS Lambda configration. Here for refrence.

var Yelp = require('yelpv3');

var yelp = new Yelp({
	app_id: 'REDACTED',
	app_secret: 'REDACTED'
})

exports.handler = (e, context, callback) => {

	var yelpSearch = new Promise((resolve, reject) => {
		var data = yelp.search({
			term: decodeURI(e.keyword), 
			longitude: parseFloat(e.longitude), 
			latitude: parseFloat(e.latitude),
			limit: 25,
			radius: 40000
		})
		resolve(data)
	})

	yelpSearch.then((data) => {
		callback(null, data)
	}).catch((err) => {
		callback(err)
	})
}