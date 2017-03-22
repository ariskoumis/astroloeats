import React from 'react';
import {
		StyleSheet,
		View,
		Text,
		Button,
		Alert,
		AsyncStorage,
		Picker
		}	from 'react-native';
import Expo, {
	Location,
	Permissions
} from 'expo';


export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			birthMonth: "6",
			birthDay: "15",
		}
	}

	componentWillMount() {
		if (this._loggedIn()) {
			this.props.onLogIn()
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title="Login with Facebook" onPress={this._handleFacebookLogin} />
				<Text> OR </Text>
				<Button title="Continue as Guest" onPress={this._handleGuestLogin} />
			</View>
		)
	}

	_loggedIn = async () => {
		AsyncStorage.getItem('birthday', (value) => {
			if (value==undefined) {
				return false
			}

			return true
		})
	}

	_handleFacebookLogin = async () => {
		const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('101465287056746', {
		permissions: ['public_profile', 'user_birthday'],
		behavior:'web'
		})
		
		if (type === 'success') {
      		const response = await fetch( `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday`)
      		const userInfo = await response.json()
      		Alert.alert('Logged in!', `Hi ${userInfo.name}!`)
      		await AsyncStorage.multiSet([['name', userInfo.name], ['birthday', userInfo.birthday]])
      		this._requestLocation()
		}
	}

	_handleGuestLogin = () => {
		this._requestLocation()
	}

	_requestLocation = async () => {
		var { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status === 'granted') {
			var currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
			this.setState({
				region: {
					latitude: currentLocation.coords.latitude,
				 	longitude: currentLocation.coords.longitude,
				 	latitudeDelta: 0.0922,
	          		longitudeDelta: 0.0421
			 	}
			})
			this.props.onLogIn()
		} else {
			await Alert.alert("Error", "Please enable location services.")
			this._requestLocation()
		}
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});