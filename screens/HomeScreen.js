import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image
} from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import HoroscopePage from '../components/HoroscopePage';
import MoodPage from '../components/MoodPage';
import StatusBarBackground from '../components/StatusBarBackground';


export default class HoroscopeTabView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			screenIsReady: false,
			index: 0,
			routes: [
				{ key: '1', title: 'Horoscope' },
				{ key: '2', title: 'Map'},
				{ key: '3', title: 'About'}
			],
			horoscope: this.props.horoscope,
			tone: this.props.tone,
			sign: this.props.sign
		}
	}


	render() {
		return (
			<View style={styles.container}>
				<StatusBarBackground />
				<TabViewAnimated 
					style = {styles.container}
					navigationState = {this.state}
					renderScene = {this._renderScene}
					onRequestChangeTab = {this._handleChangeTab}
					renderFooter = {this._renderFooter}
				/>
			</View>
		)
	}

	_renderScene = ({route}) => {
		switch(route.key) {
		case '1':
			return <HoroscopePage horoscope={this.props.horoscope} sign={this.props.sign}/>
			break
		case '2':
			return (<View style={styles.page}><Text> 2 </Text></View>)
			break
		default:
			return null
		}
	}

	_renderLabel = (scene: Scene) => {
    	const label = scene.route.title
    	switch(label) {
    	case 'Horoscope':
    		return <Image style={{height:38, width:30}} source={require('../assets/icons/crystal-ball.png')} />
    		break
		case 'Map':
			return <Icon size={30} name="map-o" />
			break
		case 'About':
			return <Icon size={35} name="question" />
			break
		default:
			break
    	}
	}

	_handleChangeTab = (index) => {
		this.setState({ index })
	}

	_renderFooter = (props) => {
		return <TabBar {...props} 
				renderLabel={this._renderLabel} 
				borderStyle={{color: "#00000"}} 
				labelStyle={{color:"#ffffff"}} 
				indicatorStyle={{backgroundColor: "#ffffff"}}
				/>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});