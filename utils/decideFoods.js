import findDominantTones from './findDominantTones';

export default decideFoods = (toneInput) => {
	var tone = findDominantTones(toneInput)
	var toneNames = []
	tone.forEach((category) => {
		toneNames.push(category.tone_name)
	})

	var toneScore = 0
	toneNames.forEach((name) => {
		if (name == 'Joy') {
			toneScore++
		} else {
			toneScore--
		}
	})

	var happyFoods = ["Salad", "Ice Cream", "Healthy Foods", "Vegetarian", "Boba", "Sandwich", "Coffee", "Tapas", "Poke", "Superfood", "Pizza", "Sushi", "Fish"]
	var sadFoods = ["Soul Food", "Mexican", "Burgers", "Hearty", "Mongolian", "Bar", "Pho", "Soup", "Ice Cream", "Greek", "Pizza", "Deep Fried", "Fondue", "Crepe"] 
	var foodArray = []
	if (toneScore >= 0) {
		foodArray = happyFoods
	} else {
		foodArray = sadFoods
	}

	
	var foodRecs = []


	while (foodRecs.length <3) {
		var randomIndex = Math.floor(Math.random() * foodArray.length)
		if (foodRecs.indexOf(foodArray[randomIndex]) == -1) {
			foodRecs.push(foodArray[randomIndex])
		}
	}
    
	return foodRecs
}