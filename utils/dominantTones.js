export default dominantTones = (horoscopeTone) => {
	var emotionTone = JSON.parse(horoscopeTone).document_tone.tone_categories[0].tones
	var dominantTones = []
	emotionTone.forEach((category) => {
		if (category.score >= 0.5) {
			var categoryName = category.tone_name[0].toUpperCase() + category.tone_name.slice(1)
			dominantTones.push(categoryName)
		}
	})

	return dominantTones
}