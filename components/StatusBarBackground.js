import React from 'react';
import {
  View,
  Text,
  StyleSheet, 
  Platform
} from 'react-native';

export default class StatusBarBackground extends React.Component {
  	render() {
		return(
			<View style={[styles.statusBarBackground, this.props.style || {}]}>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	statusBarBackground: {
		height: (Platform.OS === 'ios') ? 20 : 0,
		backgroundColor: "white",
	}
})