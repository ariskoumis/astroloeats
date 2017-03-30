import {
	AsyncStorage
} from 'react-native';


export default getAstrologicalSign = async () => {
	var birthday = new Date(await AsyncStorage.getItem('birthday'))
	var month = birthday.getMonth() + 1 //January is 0, shifted up 1 for readability
	var day = birthday.getDate()

	if (month == 1) { 
		if (day < 20) {
			return 'capricorn'
		} 
		else {
			return 'aquarius'
		}
	}
	else if (month == 2) {
		if (day < 19) {
			return 'aquarius'
		} 
		else {
			return 'pisces'
		}
	}
	else if (month == 3) {
		if (day < 21) {
			return 'pisces'
		} 
		else {
			return 'aries'
		}
	}
	else if (month == 4) {
		if (day < 20) {
			return 'aries'
		} 
		else {
			return 'taurus'
		}
	}
	else if (month == 5) {
		if (day < 21) {
			return 'taurus'
		} 
		else {
			return 'gemini'
		}
	}
	else if (month == 6) {
		if (day <= 21) {
			return 'gemini'
		} 
		else {
			return 'cancer'
		}
	}
	else if (month == 7) {
		if (day <= 23) {
			return 'cancer'
		} 
		else {
			return 'leo'
		}
	}
	else if (month == 8) {
		if (day < 23) {
			return 'leo'
		} 
		else {
			return 'virgo'
		}
	}
	else if (month == 9) {
		if (day < 23) {
			return 'virgo'
		} 
		else {
			return 'libra'
		}
	}
	else if (month == 10) {
		if (day < 23) {
			return 'libra'
		} 
		else {
			return 'scorpio'
		}
	}
	else if (month == 11) {
		if (day < 22) {
			return 'scorpio'
		} 
		else {
			return 'sagittarius'
		}
	}
	else if (month == 12) {
		if (day > 22) {
			return 'sagittarius'
		} 
		else {
			return 'capricorn'
		}
	}	
}