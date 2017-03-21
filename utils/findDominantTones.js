export default findDominantTones = (horoscopeTone) => {
	var emotionTone = JSON.parse(horoscopeTone).document_tone.tone_categories[0].tones
	var dominantTones = []
	emotionTone.forEach((category) => {
		if (category.score >= 0.5) {
			console.log(category)
			dominantTones.push(category)
		}
	})
	return dominantTones
}