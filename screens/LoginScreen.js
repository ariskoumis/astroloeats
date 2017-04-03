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
		Image,
		Animated
} from 'react-native';
import Expo, {
	Location,
	Permissions,
	Font
} from 'expo';
import Modal from 'react-native-modalbox';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingScreen from './LoadingScreen';

import parseDate from '../utils/parseDate';

const videoSource = require('../assets/videos/loadingBG.mp4');

export default class LoginScreen extends React.Component {
	constructor() {
		super()
		
		this.state = {
			loaded: false,
			isDateTimePickerVisible: false,
			guestBirthday: "11/11/2011",
			guestName: "John Doe",
			backgroundOpacity: new Animated.Value(0),

		}

		this._handleGuestLogin = this._handleGuestLogin.bind(this)
		this._requestLocation = this._requestLocation.bind(this)
		this._handleFacebookLogin = this._handleFacebookLogin.bind(this)
		this._handleDatePicked = this._handleDatePicked.bind(this)
		this._handleGuestLogin = this._handleGuestLogin.bind(this)
	}

	async componentDidMount() {
		if (await this._loggedIn()) {
			this.props.onLogIn()
		}

		this.setState({loaded: true})
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

	_fadeInVideo = () => {
		setTimeout(() => {
			Animated.spring(this.state.backgroundOpacity, {toValue: 1}).start()
		}, 500)
		//The background resizes after first playthrough of video. Seeking past the end of the video makes it resize instantly.
		this.refs.videoBackground.seek(100000)
	}

	async _handleGuestLogin() {
		await AsyncStorage.multiSet([['name', this.state.guestName], ['birthday', this.state.guestBirthday]])
		this._requestLocation()
	}

	render() {
		if (!this.state.loaded) {
			return <LoadingScreen />
		}

		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Animated.View style={[styles.backgroundViewWrapper, {opacity: this.state.backgroundOpacity}]}>
			            <Expo.Components.Video
			            	ref={"videoBackground"}
			              source={videoSource}
			              style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
			              resizeMode="cover"
			              repeat={true}
			              mute={true}
			              onLoad={() => this._fadeInVideo()}
			            />
		          	</Animated.View>
				</View>

				<View style={styles.overlay}>
						<View style={{alignItems: 'center', marginTop: 50}}>			
							<Image style={{height: 250, width: 250}} source={require('../assets/icons/app-white.png')} />
							<Text style={{...Font.style('vonique'), fontSize: 40, color: "#ffffff"}}> AstroloEats </Text> 
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
								<Text style={[styles.inputHeader, {...Font.style('vonique')}]}>Name</Text>
						        <TextInput
						        	style={styles.textInput}
						        	selectTextOnFocus={true}
						        	onChangeText={(text) => this.setState({guestName: text})}
						        	value={this.state.guestName}
					        	/>
								<Text style={[styles.inputHeader, {...Font.style('vonique')}]}>Birthday</Text>
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
								<Text style={{fontSize: 30}} style={{color: '#ffffff'}}>Login</Text>
								<Icon style={{marginLeft: 5}}size={30} name="arrow-right" color="#ffffff" />
							</TouchableOpacity>
						</Modal>
				</View>
			</View>

			
		)
	}
}

var {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center'
	},
	background: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: '#000',
	},
	backgroundViewWrapper: {
		...StyleSheet.absoluteFillObject,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: "#E7ECEF"
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
  	borderRadius: 5,
  	paddingLeft: 5,
  	marginRight: 5,
  	color: "#a9a9a9"
  },
  inputHeader: {
  	fontSize: 30,
  	...Font.style('vonique')
  },
  guestLoginButton: {
  	flexDirection:'row', 
  	alignSelf: 'stretch',
  	alignItems:'center', 
  	justifyContent:'center',
  	marginLeft: 5,
  	marginRight: 5,
  	marginBottom: 30,
  	backgroundColor: "#0F7173",
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