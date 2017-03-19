//This function is used on my AWS Lambda configration. Here for refrence.

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: 'REDACTED',
  password: 'REDACTED',
  version_date: '2016-05-19'
})



exports.handler = (e, context, callback) => {
	tone_analyzer.tone({ text: e.horoscope },
		(err, tone) => {
		    if (err)
		      callback(err)
		    else
		      callback(null, tone)
	})	
}	