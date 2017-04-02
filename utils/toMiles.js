//yelp API presents distance in meters
//This function converts the distance to freedom units.
export default function toMiles(metricDistance) {
	return	(metricDistance * 0.000621371).toPrecision(2)
}