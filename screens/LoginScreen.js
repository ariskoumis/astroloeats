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
import Expo from 'expo';
import Router from '../navigation/Router';


export default class LoginScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			birthMonth: "6",
			birthDay: "15",
			showBirthdayPickers: false
		}
	}

	render() {
		return (
			<View style={styles.container}>
			{ !this.state.showBirthdayPickers ?
				<View style={styles.container}>
					<Button title="Login with Facebook" onPress={this._handleFacebookLogin} />
					<Text> OR </Text>
					<Button title="Continue as Guest" onPress={this._handleGuestLogin} />
				</View>
			:
				<View style={styles.pickers}>
					<View style={{alignItems: 'center'}}>
						<Text> Month </Text>
						<Picker 
							style={{width: 100}}
							onValueChange={(month) => this.setState({birthMonth : month})}
							selectedValue={this.state.birthMonth}>
							<Picker.Item label="1" value="1"/>
							<Picker.Item label="2" value="2"/>
							<Picker.Item label="3" value="3"/>
							<Picker.Item label="4" value="4"/>
							<Picker.Item label="5" value="5"/>
							<Picker.Item label="6" value="6"/>
							<Picker.Item label="7" value="7"/>
							<Picker.Item label="8" value="8"/>
							<Picker.Item label="9" value="9"/>
							<Picker.Item label="10" value="10"/>
							<Picker.Item label="11" value="11"/>
							<Picker.Item label="12" value="12"/>
						</Picker>
					</View>
					<View style={{alignItems: 'center'}}>
						<Text style={{justifyContent: 'center'}}> Day </Text>
						<Picker
							style={{width: 100}}
							onValueChange={(day) => this.setState({birthMonth : day})}
							selectedValue={this.state.birthDay}>
							<Picker.Item label="1" value="1"/>
							<Picker.Item label="2" value="2"/>
							<Picker.Item label="3" value="3"/>
							<Picker.Item label="4" value="4"/>
							<Picker.Item label="5" value="5"/>
							<Picker.Item label="6" value="6"/>
							<Picker.Item label="7" value="7"/>
							<Picker.Item label="8" value="8"/>
							<Picker.Item label="9" value="9"/>
							<Picker.Item label="10" value="10"/>
							<Picker.Item label="11" value="11"/>
							<Picker.Item label="12" value="12"/>
							<Picker.Item label="13" value="13"/>
							<Picker.Item label="14" value="14"/>
							<Picker.Item label="15" value="15"/>
							<Picker.Item label="16" value="16"/>
							<Picker.Item label="17" value="17"/>
							<Picker.Item label="18" value="18"/>
							<Picker.Item label="19" value="19"/>
							<Picker.Item label="20" value="20"/>
							<Picker.Item label="21" value="21"/>
							<Picker.Item label="22" value="22"/>
							<Picker.Item label="23" value="23"/>
							<Picker.Item label="24" value="24"/>
							<Picker.Item label="25" value="25"/>
							<Picker.Item label="26" value="26"/>
							<Picker.Item label="27" value="27"/>
							<Picker.Item label="28" value="28"/>
							<Picker.Item label="29" value="29"/>
							<Picker.Item label="30" value="30"/>
							<Picker.Item label="31" value="31"/>
						</Picker>
					</View>
				</View> 
			}
			</View>
		)
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
      		console.log(userInfo)
      		await AsyncStorage.multiSet([['id', userInfo.id], ['name', userInfo.name], ['birthday', userInfo.birthday]])
      		this.props.onLogIn()
		}
	}

	_handleGuestLogin = () => {
		this.setState({showBirthdayPickers: true})
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickers: {
  	flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});