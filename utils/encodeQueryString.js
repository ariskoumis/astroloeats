//When passing the user's horoscope as a querystring in my Tone Analyzer API Call, encodeURIComponent() resulted in Lambda throwing multiple errors
//This workaround uses regex to eliminate punctuation from the horoscope string

export default function encodeQueryString(rawString) {
	var encodedString = rawString.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
}