import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import HoroscopePageHeader from '../components/HoroscopePageHeader';

export default class HoroscopeScreen extends React.Component {
	render () {
		return (
			<View style={[styles.page, { backgroundColor: '#ffffff' }]}>
				<View style={{flex: .09}}>
					<HoroscopePageHeader sign={this.props.sign} />			
				</View>
				<View style={styles.horoscope}>
					<Text style={{color: "#000000"}}>
						{this.props.horoscope} 
					</Text>
				</View>
				<View style={styles.tone} >
					<Text> hi </Text>
				</View>
			</View>
		)	
	}
	
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  horoscope: {
  	flex: .3,
  	alignItems: 'center',
  	backgroundColor: "#f9c26a",
  	borderRadius: 10,
  	paddingLeft: 5,
  	paddingRight: 5
  },
  tone: {
  	flex: .3,
  	alignItems: 'center',
  },

});

