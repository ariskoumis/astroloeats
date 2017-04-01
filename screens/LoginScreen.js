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
		TextInput,
		Dimensions,
		Image
} from 'react-native';
import Expo, {
	Location,
	Permissions
} from 'expo';
import Modal from 'react-native-modalbox';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import parseDate from '../utils/parseDate';

export default class LoginScreen extends React.Component {
	constructor() {
		super()
		
		this.state = {
			isDateTimePickerVisible: false,
			guestBirthday: "11/11/2011",
			guestName: "John Doe"
		}

		this._handleGuestLogin = this._handleGuestLogin.bind(this)
		this._requestLocation = this._requestLocation.bind(this)
		this._handleFacebookLogin = this._handleFacebookLogin.bind(this)
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


	_handleDatePicked(date) {
		this.setState({
			isDateTimePickerVisible: false,
			guestBirthday: parseDate(date)
		})
	}

	async _handleGuestLogin() {
		await AsyncStorage.multiSet([['name', this.state.guestName], ['birthday', this.state.guestBirthday]])
		this._requestLocation()
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{alignItems: 'center', marginTop: 50}}>			
					<Image style={{height: 250, width: 250}} source={require('../assets/icons/crystal-ball.png')} />
					<Text style={{fontSize: 40}}> AstroloEats </Text> 
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={[styles.button, {backgroundColor: "#3B5998"}]} onPress={this._handleFacebookLogin} >
						<Icon style={{marginLeft: 15}} size={30} name="facebook-square" color="#ffffff"/>
						<View style={styles.buttonText}>
							<Text style={{color: "#ffffff"}}> Login with Facebook </Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, {marginBottom: 100, backgroundColor: "#a9a9a9"}]}  onPress={() => this.refs.modal1.open()} >
						<Icon style={{marginLeft: 15}} size={30} name="user" color="#ffffff"/>
						<View style={styles.buttonText}>
							<Text style={{color: "#ffffff"}}> Continue as Guest </Text>
						</View>
					</TouchableOpacity>
				</View>

				<Modal style={styles.modal} ref="modal1" backdrop={true}  position={"top"}>
					<TouchableOpacity style={styles.exitModal}>
						<Icon size={30} name={'times'} onPress={() => this.refs.modal1.close()}/>
					</TouchableOpacity>

					<View style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch', marginLeft: 10}}>
						<Text style={styles.inputHeader}>Name</Text>
				        <TextInput
				        	style={styles.textInput}
				        	selectTextOnFocus={true}
				        	onChangeText={(text) => this.setState({guestName: text})}
				        	value={this.state.guestName}
			        	/>
						<Text style={styles.inputHeader}>Birthday</Text>
						<TextInput
				        	style={styles.textInput}
				        	onFocus={() => {this.setState ({isDateTimePickerVisible: true})}}
				        	value={this.state.guestBirthday}
			        	/>
			        	<DateTimePicker
				          isVisible={this.state.isDateTimePickerVisible}
				          onConfirm={this._handleDatePicked}
				          onCancel={() => this.setState({isDateTimePickerVisible: false})}
				        />
					</View>

					<TouchableOpacity style={styles.guestLoginButton} activeOpacity={1}  onPress={this._handleGuestLogin}>
						<Text style={{fontSize: 30, paddingRight: 5}} style={{color: '#ffffff'}}>Login</Text>
						<Icon size={30} name="arrow-right" color="#ffffff" />
					</TouchableOpacity>
				</Modal>
			</View>

			
		)
	}
}

var {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  button: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	width: width * .8,
  	marginTop: 5,
  	borderRadius: 5
  },
  buttonText: {
  	flex: 1,
  	justifyContent: 'center', 
  	alignItems: 'center'
  },
  banner: {
  	justifyContent: 'flex-start'
  },
  textInput: {
  	height: 40,
  	borderColor: 'gray',
  	borderWidth: 1,
  	paddingLeft: 5,
  	marginRight: 5
  },
  inputHeader: {
  	fontSize: 30,
  },
  guestLoginButton: {
  	flexDirection:'row', 
  	alignSelf: 'flex-end',
  	alignItems:'center', 
  	justifyContent:'center', 
  	marginRight: 5,
  	marginBottom: 30,
  	backgroundColor: "#00ff00",
  	borderRadius: 5,
  	padding: 5
  },
  exitModal: {
  	flexDirection:'row', 
  	alignSelf: 'flex-end',
  	justifyContent:'center', 
  	marginRight: 10,
  	marginTop: 30,
  }
});