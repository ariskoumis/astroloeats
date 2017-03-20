import React from 'react';
import {
	View, 
	Text,
	StyleSheet,
} from 'react-native';
import findDominantTones from '../utils/findDominantTones';

export default class MoodScreen extends React.Component {
	render() {
		return (
			<View style={[styles.page, {backgroundColor: '#673ab7'}]}>
				<Text> 
					{this.props.dominantTones}
				</Text>
			</View>
		)
	}
}

// var dominantTones = await findDominantTones(horoscopeTone)

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})