import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

export default class HoroscopeScreen extends React.Component {
	render () {
		return (
			<View style={[ styles.page, { backgroundColor: '#ff4081' }]}>			
				<Text> 
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

