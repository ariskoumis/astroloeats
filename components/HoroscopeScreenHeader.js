import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

import capitalizeFirst from '../utils/capitalizeFirst';

export default class HoroscopeScreenHeader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sign: capitalizeFirst(props.sign)
		}

	}

	componentDidMount() {
		this.setState({
			description: this._getDescription()
		})
	}

	_getIcon() {
		switch(this.props.sign) {
			case 'aquarius':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/aquarius.png')} />
				break
			case 'pisces':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/pisces.png')} />
				break
			case 'aries':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/aries.png')} />
				break
			case 'taurus':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/taurus.png')} />
				break
			case 'gemini':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/gemini.png')} />
				break
			case 'cancer':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/cancer.png')} />
				break
			case 'leo':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/leo.png')} />
				break
			case 'virgo':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/virgo.png')} />
				break
			case 'libra':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/libra.png')} />
				break
			case 'scorpio':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/scorpio.png')} />
				break
			case 'sagittarius':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/sagittarius.png')} />
				break
			case 'capricorn':
				return <Image style={styles.image} resizeMode="contain" source={require('../assets/icons/zodiac-vectors/capricorn.png')} />
				break
			default:
				break
		}
	}

	_getDescription() {
		var sign = this.state.sign.toLowerCase()
		switch(sign) {
			case 'aquarius':
				return "The Water Bearer"
				break
			case 'pisces':
				return "The Fish"
				break
			case 'aries':
				return "The Goat"
				break
			case 'taurus':
				return "The Bull"
				break
			case 'gemini':
				return "The Twins"
				break
			case 'cancer':
				return "The Crab"
				break
			case 'leo':
				return "The Lion"
				break
			case 'virgo':
				return "The Virgin"
				break
			case 'libra':
				return "The Scales"
				break
			case 'scorpio':
				return "The Scorpion"
				break
			case 'sagittarius':
				return "The Archer"
				break
			case 'capricorn':
				return "The Goat"
				break
			default:
				break
		}
	}

	_getDate() {
		var current = new Date()
		var month = current.getMonth() + 1
		var day = current.getDate()
		var year = current.getFullYear().toString().substring(2, 4)
		return (
			<Text style={{fontSize: 20}}>
				{month}/{day}/{year}
			</Text>
		)
	}

	render() {
		return (
			<View style={[styles.container, {paddingTop: 10}]}>
				<View style={styles.leftPadding}>
					
				</View>
				<View style={styles.signInfo}>
					<View style={{flexDirection:"row",alignItems:"center"}}>
						{this._getIcon()}
						<View style={{alignItems:'center'}}>
							<Text style={{fontSize: 30}}> {this.state.sign} </Text>
							<Text style={{fontStyle: "italic", fontSize: 20}}> {this.state.description} </Text>
						</View>
					</View>
				</View>
				<View style={styles.currentDate} >
					{this._getDate()}
				</View>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	signInfo: {
		flexDirection: 'column',
		alignItems: 'flex-end'
	},
	currentDate: {
	},
	header: {
		backgroundColor: '#3185FC'
	},
	image: {

    }
})
