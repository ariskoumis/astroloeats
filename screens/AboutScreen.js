import React from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

export default class AboutScreen extends React.Component {
	static route = {
		navigationBar: {
			title: "About"
		}
	}

	render () {
		return (
			<View style={styles.container}>
				<Text> About </Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});