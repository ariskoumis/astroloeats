import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

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
    this.handleLogout = this.handleLogout.bind(this)
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

  async handleLogout() {
    await AsyncStorage.multiRemove(['name', 'birthday'])
    this.setState({
      loggedIn: false
    })
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginScreen onLogIn={this.onLogIn} handleRegionUpdate={this._handleRegionUpdate}/>
    }

    return (
      <HomeScreen region={this.state.region} handleLogout={this.handleLogout}/>
    )
  }

}

Expo.registerRootComponent(App);