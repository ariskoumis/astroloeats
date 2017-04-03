export default function parseDate(dateObj) {
	var birthday = dateObj

	var month = birthday.getMonth() + 1
	month.length == 1 ? month = "0" + month : null 
	var day = birthday.getDate()
	day.length == 1 ? day = "0" + day : null

	var year = birthday.getFullYear()

	return month + "/" + day + "/" + year
}