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
	constructor() {
		super()
		this._handleGuestLogin = this._handleGuestLogin.bind(this)
		this._requestLocation = this._requestLocation.bind(this)
		this._handleFacebookLogin = this._handleFacebookLogin.bind(this)
	}

	async componentWillMount() {
		if (await this._loggedIn()) {
			this.props.onLogIn()
		}
	}

	

	async _loggedIn() {
		var value = await AsyncStorage.getItem('birthday')
		if (!value) {
			return false
		}

		return true
	}

	async _handleFacebookLogin() {
		const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('101465287056746', {
		permissions: ['public_profile', 'user_birthday'],
		behavior:'web'
		})
		
		if (type === 'success') {
      		const response = await fetch( `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday`)
      		const userInfo = await response.json()
      		await AsyncStorage.multiSet([['name', userInfo.name], ['birthday', userInfo.birthday]])
      		Alert.alert('Logged in!', `Hi ${userInfo.name}!`)
      		this._requestLocation()
		}
	}

	_handleGuestLogin() {
		this._requestLocation()
	}

	async _requestLocation() {
		var { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status === 'granted') {
			var currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
			this.props.handleRegionUpdate({
				latitude: currentLocation.coords.latitude,
			 	longitude: currentLocation.coords.longitude,
			 	latitudeDelta: 0,
          		longitudeDelta: 0
			})
			this.props.onLogIn()
		} else {
			await Alert.alert("Error", "Please enable location services.")
			this._requestLocation()
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});