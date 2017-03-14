import React from 'react';
import {
		StyleSheet,
		View,
		Text,
		Button,
		Alert,
		AsyncStorage
		}	from 'react-native';
import Expo from 'expo';
import Router from '../navigation/Router';


export default class LoginScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>

				<Button title="Login with Facebook" onPress={this._handleFacebookLogin} />
			</View>
		)
	}

	_handleLogIn = () => {
		this.props._onLogIn()
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
      		this._handleLogIn()
		}

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