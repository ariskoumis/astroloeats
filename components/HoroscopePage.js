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
				<HoroscopePageHeader sign={this.props.sign} />			
				<Text style={{color: "#000000"}}>
					{this.props.dailyHoroscope} 
				</Text>
			</View>
		)	
	}
	
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

