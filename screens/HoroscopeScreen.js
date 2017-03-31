import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

import HoroscopeScreenHeader from '../components/HoroscopeScreenHeader';
import MoodGraph from '../components/MoodGraph';


export default class HoroscopeScreen extends React.Component {
	constructor() {
		super()
		this._renderContent = this._renderContent.bind(this)
	}
  	
	_renderHeader(section, i, isActive) {
		return (
			<Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
				<Text style={styles.headerText}>{section.title}</Text>
			</Animatable.View>
		);
	}

	_renderContent(section, i, isActive) {
		switch(section.title) {
			case "Today's Horoscope":
				return (
					<Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
						<Animatable.Text animation={isActive ? 'bounceIn' : undefined}>{this.props.horoscope}</Animatable.Text>
					</Animatable.View>
				)
				break
			case "Horoscope's Tone":
				return (
					<Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
						<MoodGraph tone={this.props.tone}/>
					</Animatable.View>
				)
				break
			case "Food Reccomendations":
				return (
					<Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
						<Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
							{this.props.foods[0]}, {this.props.foods[1]}, {this.props.foods[2]}
						</Animatable.Text>
					</Animatable.View>
				)
				break
			default:
				break

		}
		
	}

	render() {
		return (
			<View style={{flex: 1}} >
				<HoroscopeScreenHeader sign={this.props.sign} />

				<View style={styles.container}>
					<Accordion
						initallyActiveSection={0}
						sections={CONTENT}
						renderHeader={this._renderHeader}
						renderContent={this._renderContent}
						duration={400}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  header: {
  	alignItems: 'flex-start',
  	padding: 10
  },
  headerText: {
	textAlign: 'center',
	fontSize: 25,
	fontWeight: '500'
  },
  content: {
	backgroundColor: '#fff',
  },
  active: {
	backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
	backgroundColor: 'rgba(245,252,255,1)',
  },
  container: {
  	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
  }
})

const CONTENT = [
  {
	title: "Today's Horoscope",
  },
  {
	title: "Horoscope's Tone"
  },
  {
	title: "Food Reccomendations"
  }
]
