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
import TestScreen from './screens/TestScreen';

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      loggedIn: false,
      region: {
        longitude: 0,
        latitude: 0
      }
    }

    this.onLogIn = this.onLogIn.bind(this)
    this._handleRegionUpdate = this._handleRegionUpdate.bind(this)
  }

  _handleRegionUpdate(newRegion) {
    this.setState({
      region: newRegion
    })
  }

  onLogIn() {
    this.setState({
      loggedIn: true
    })  
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginScreen onLogIn={this.onLogIn} handleRegionUpdate={this._handleRegionUpdate}/>
    }

    return (
      <HomeScreen region={this.state.region}/>
    )
  }

}

Expo.registerRootComponent(App);