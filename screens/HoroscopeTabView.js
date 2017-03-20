import React from 'react';
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';

import getAstrologicalSign from '../utils/getAstrologicalSign';
import findDominantTones from '../utils/findDominantTones';

import HoroscopePage from '../components/HoroscopePage';
import MoodPage from '../components/MoodPage';

export default class HoroscopeTabView extends React.Component {
	state = {
		index: 0,
		routes: [
			{ key: '1', title: 'Horoscope' },
			{ key: '2', title: "Mood" },
			{ key: '3', title: 'Food'}
		],
		screenIsReady: false
	}

	async componentDidMount() {
		await this._loadContentAsync()
		this.setState({
			screenIsReady: true
		})
	}

	_handleChangeTab = (index) => {
		this.setState({ index })
	}

	_renderHeader = (props) => {
		return <TabBar {...props} />
	}

	_renderScene = ({ route }) => {
		switch (route.key) {
		case '1':
			return <HoroscopePage dailyHoroscope={this.state.dailyHoroscope}/>
		case '2':
			return <MoodPage dominantTones={this.state.horoscopeTone}/>;
		case '3':
			return <View style={[ styles.page, { backgroundColor: '#b7533a' } ]} />;
		default:
			return null;
		}
	}

	_loadContentAsync = async () => {
		var sign = await getAstrologicalSign()
		const response = await fetch(`http://theastrologer-api.herokuapp.com/api/horoscope/${sign}/today`)
		var horoscope = JSON.parse(response._bodyText).horoscope

		var horoscopeTone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit
		var dominantTones = await findDominantTones(horoscopeTone)

		this.setState({
			dailyHoroscope: horoscope,
			horoscopeTone: JSON.stringify(horoscopeTone)
		})
	}


	render() {
		if (!this.state.screenIsReady) {
			return (
				<View style={styles.loading}>
					<Text> Loading </Text>
				</View>
			)
		} else {
			return (
				<TabViewAnimated
					style={styles.container}
					navigationState={this.state}
					renderScene={this._renderScene}
					renderHeader={this._renderHeader}
					onRequestChangeTab={this._handleChangeTab}
				/>
			)
		}
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});