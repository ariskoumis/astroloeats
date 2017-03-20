import React from 'react';
import {
	View,
	Text
} from 'react-native';

export default class HoroscopePageHeader extends React.Component {
	render() {
		return (
			<View>
				<Text> {this.props.sign} </Text>
			</View>
		)
	}
}