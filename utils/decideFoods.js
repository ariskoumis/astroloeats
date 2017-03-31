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

	var happyFoods = ["Salad", "Ice Cream", "Healthy Foods", "Vegetarian Food", "Boba", "Sandwich", "Coffee", "Tapas", "Poke", "Superfood", "Pizza", "Sushi", "Fish", "Doughnuts", "Wings"]
	var sadFoods = ["Soul Food", "Mexican Food", "Burgers", "Hearty Food", "Mongolian BBQ", "Bar", "Pho", "Soup", "Ice Cream", "Greek Food", "Pizza", "Deep Fried", "Fondue", "Crepe", "Doughnuts", "Italian", "Chinese Food", "Deep Dish"] 
	
	var foodArray = []
	if (toneScore >= 0) {
		foodArray = happyFoods
	} else {
		foodArray = sadFoods
	}

	//The First Index in foodRecs is an array of the dominant tones.
	var foodRecs = []
	foodRecs.push(toneNames)


	while (foodRecs.length < 4) {
		var randomIndex = Math.floor(Math.random() * foodArray.length)
		if (foodRecs.indexOf(foodArray[randomIndex]) == -1) {
			foodRecs.push(foodArray[randomIndex])
		}
	}
    
	return foodRecs
}