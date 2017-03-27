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
  	_renderHeader(section, i, isActive) {
    	return (
      		<Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        		<Text style={styles.headerText}>{section.title}</Text>
      		</Animatable.View>
    	);
  	}

  	_renderContent(section, i, isActive) {
    	return (
      		<Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        		<Animatable.Text animation={isActive ? 'bounceIn' : undefined}>Yo!</Animatable.Text>
      		</Animatable.View>
		);
  	}

	render() {
	 	return (
	 		<View style={styles.container}>
	 			<Accordion
	 				sections={CONTENT}
	 				renderHeader={this._renderHeader}
					renderContent={this._renderContent}
					duration={400}
				/>
			</View>
	 	)
	}
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  horoscope: {
    alignItems: 'center',
    backgroundColor: "#f9c26a",
    borderRadius: 15,
    padding:5
  },
  tone: {
    alignItems: 'center',
    backgroundColor: "#ac728f",
    borderRadius: 15,
    padding:5
  },
  reccomendation: {
    alignItems: 'center',
    backgroundColor: "#ac728f",
    borderRadius: 15,
    padding:5	
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  container: {

    justifyContent: 'center',
    alignItems: 'center'
  }
})

const CONTENT = [
  {
    title: 'First',
    content: BACON_IPSUM,
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
  },
];

const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';



// return (
// 			<View style={[styles.page, { backgroundColor: '#ffffff' }]}>
// 				<View style={styles.header}>
// 					<HoroscopeScreenHeader sign={this.props.sign} />
// 				</View>
// 				<View style={styles.horoscope}>
// 					<Text style={{fontWeight: "bold", fontSize: 16}}>
// 						Today's Horoscope
// 					</Text>
// 					<Text style={{color: "#000000"}}>
// 						{this.props.horoscope} 
// 					</Text>
// 				</View>
// 				<View style={styles.tone}>
// 					<Text style={{fontWeight: "bold", fontSize: 16}}>
// 						Mood Prediction
// 					</Text>
// 					<MoodGraph tone={this.props.tone} style={{flex:1}}/>
// 				</View>
// 				<View style={styles.reccomendation}>
// 					<Text style={{fontWeight: "bold", fontSize: 16}}>
// 						Food Suggestions
// 					</Text>
// 					<Text> {this.props.foods[0]}, {this.props.foods[1]}, {this.props.foods[2]} </Text>
// 				</View>
// 			</View>
// 		)  
