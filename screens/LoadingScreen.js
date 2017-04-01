import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

export default class LoadingScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			loadingText: "Predicting Your Future",
			ellipsis: "."
		}

		this.ellipsisTimer = this.ellipsisTimer.bind(this)
	}


	componentDidMount() {
		var intervalId = setInterval(this.ellipsisTimer, 500)
		// store intervalId in the state so it can be accessed later:
		this.setState({intervalId: intervalId})
	}

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId)
	}

	ellipsisTimer() {
		// setState method is used to update the state
		var dots = this.state.ellipsis
		if (dots.length < 3) {
			dots += '.'
		} else {
			dots = ''
		}

		this.setState({ ellipsis: dots })
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={{height: 250, width: 250}} source={require('../assets/icons/loading.gif')} />
				<Text>Predicting Your Future{this.state.ellipsis}</Text> 
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})