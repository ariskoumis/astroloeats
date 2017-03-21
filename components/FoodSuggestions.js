import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView
} from 'react-native';

import findDominantTones from '../utils/findDominantTones';
import capitalizeFirst from '../utils/capitalizeFirst';

export default class FoodSuggestions extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tone: JSON.parse(props.tone),
			foods: []
		}
		this._decideFoods = this._decideFoods.bind(this)
	}

	componentDidMount() {
		this._decideFoods()
	}

	render() {
		return (
			<View>
				<Text> {this.state.foods[0]}, {this.state.foods[1]}, {this.state.foods[2]} </Text>
			</View>
		)
	}

	_decideFoods() {
		var tone = findDominantTones(this.state.tone)
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

		var happyFoods = ["salad", "ice cream", "healthy foods", "vegetarian", "boba", "sandwich", "coffee", "tapas", "poke", "superfood", "pizza", "sushi", "fish"]
		var sadFoods = ["soul food", "mexican", "burgers", "hearty", "mongolian", "bar", "pho", "soup", "ice cream", "greek", "pizza", "deep fried", "fondue", "crepe"] 
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
				foodRecs.push(capitalizeFirst(foodArray[randomIndex]))
			}
		}
	    
	    this.setState({
	      foods: foodRecs
	    })
	}
}