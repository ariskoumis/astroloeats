import React from 'react';
import {
		StyleSheet,
		View,
		Text,
		Button,
		Alert,
		AsyncStorage,
		Picker,
		TouchableOpacity,
		TextInput
} from 'react-native';
import Expo, {
	Location,
	Permissions
} from 'expo';
import Modal from 'react-native-modalbox';
import DateTimePicker from 'react-native-modal-datetime-picker';

import parseDate from '../utils/parseDate';

export default class LoginScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			isDateTimePickerVisible: false,
			guestBirthday: "",
			guestName: "Name"
		}

		this._handleGuestLogin = this._handleGuestLogin.bind(this)
		this._requestLocation = this._requestLocation.bind(this)
		this._handleFacebookLogin = this._handleFacebookLogin.bind(this)
		this._showDateTimePicker = this._showDateTimePicker.bind(this)
		this._hideDateTimePicker = this._hideDateTimePicker.bind(this)
		this._handleDatePicked = this._handleDatePicked.bind(this)
		this._handleGuestLogin = this._handleGuestLogin.bind(this)
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
      		console.log(userInfo.birthday)
      		console.log(typeof userInfo.birthday)
      		Alert.alert('Logged in!', `Hi ${userInfo.name}!`)
      		this._requestLocation()

		}
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

	_showDateTimePicker() {
		this.setState ({
			isDateTimePickerVisible: true
		})
	}

	_hideDateTimePicker() {
		this.setState({
			isDateTimePickerVisible: false
		})
	}

	_handleDatePicked(date) {
		this._hideDateTimePicker()

		this.setState({
			guestBirthday: parseDate(date)
		})
	}

	async _handleGuestLogin() {
		await AsyncStorage.multiSet([['name', this.state.guestName], ['birthday', this.state.guestBirthday]])
		this._requestLocation()
	}



	render() {
		return (
			<View style={styles.container}>
				<Button title="Login with Facebook" onPress={this._handleFacebookLogin} />
				<Text> OR </Text>
				<Button title="Continue as Guest" onPress={()=>this.refs.modal1.open()} />
				<Modal style={styles.container} ref="modal1" backdrop={true}  position={"top"}>
					<Text>Modal on top</Text>
					<TouchableOpacity onPress={this._showDateTimePicker}>
						<Text>Birthday</Text>
					</TouchableOpacity>
					<Button title="Test" onPress={()=>console.log(this.state.guestBirthday + " " + typeof this.state.guestBirthday)} />
					<DateTimePicker
			          isVisible={this.state.isDateTimePickerVisible}
			          onConfirm={this._handleDatePicked}
			          onCancel={this._hideDateTimePicker}
			        />
			        <TextInput
			        	style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			        	onChangeText={(text) => this.setState({guestName: text})}
			        	value={this.state.guestName}
		        	/>
		        	<TouchableOpacity onPress={this._handleGuestLogin}>
						<Text>Login</Text>
					</TouchableOpacity>
				</Modal>
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