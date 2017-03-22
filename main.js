import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      loggedIn: false
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginScreen onLogIn={this._onLogIn}/>
    } 

    return (
      <HomeScreen horoscope={this.state.horoscope} tone={this.state.tone} sign={this.state.sign} />
    )
  }

  _onLogIn = () => {
    this.setState({
      loggedIn: true
    })  
  }

}

Expo.registerRootComponent(App);