//This function is used on my AWS Lambda configration. Here for refrence.

var Yelp = require('yelpv3');

var yelp = new Yelp({
	app_id: 'RECACTED',
	app_secret: 'REDACTED'
})

exports.handler = (e, context, callback) => {

	var yelpSearch = new Promise((resolve, reject) => {
		var data = yelp.search({
			term: e.keyword, 
			longitude: parseInt(e.longitude), 
			latitude: parseInt(e.latitude)
		})
		resolve(data)
	})

	yelpSearch.then((data) => {
		callback(null, data)
	}).catch((err) => {
		callback(err)
	})
}