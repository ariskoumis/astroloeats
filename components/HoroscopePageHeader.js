import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

export default class HoroscopePageHeader extends React.Component {
	render() {
		return (
			<View style={styles.header}>
				{this._chooseResource}
				<Text> {this.props.sign} </Text>
			</View>
		)
	}

	_chooseResource() {
		switch(this.props.sign) {
			case 'aquarius':
				return <Image source={require('../assets/icons/zodiac-vectors/aquarius.png')} />
			case 'pisces':
				return <Image source={require('../assets/icons/zodiac-vectors/pisces.png')} />
			case 'aries':
				return <Image source={require('../assets/icons/zodiac-vectors/aries.png')} />
			case 'taurus':
				return <Image source={require('../assets/icons/zodiac-vectors/taurus.png')} />
			case 'gemini':
				return <Image source={require('../assets/icons/zodiac-vectors/gemini.png')} />
			case 'cancer':
				return <Image source={require('../assets/icons/zodiac-vectors/cancer.png')} />
			case 'leo':
				return <Image source={require('../assets/icons/zodiac-vectors/leo.png')} />
			case 'virgo':
				return <Image source={require('../assets/icons/zodiac-vectors/virgo.png')} />
			case 'libra':
				return <Image source={require('../assets/icons/zodiac-vectors/libra.png')} />
			case 'scorpio':
				return <Image source={require('../assets/icons/zodiac-vectors/scorpio.png')} />
			case 'sagittarius':
				return <Image source={require('../assets/icons/zodiac-vectors/sagittarius.png')} />
			case 'capricorn':
				return <Image source={require('../assets/icons/zodiac-vectors/capricorn.png')} />

		}
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#3185FC"
	}
})
