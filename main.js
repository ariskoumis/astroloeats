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
      loggedIn: false,
      region: {
        longitude: 0,
        latitude: 0
      }
    }
  }

  render() {
    if (!this.d.loggedIn) {
      return <LoginScreen onLogIn={this.onLogIn} handleRegionUpdate={this._handleRegionUpdate}/>
    } 

    return (
      <HomeScreen region={this.state.region}/>
    )
  }

  _handleRegionUpdate = (newRegion) => {
    this.setState({
      region: newRegion
    })
  }

  onLogIn = () => {
    this.setState({
      loggedIn: true
    })  
  }

}

Expo.registerRootComponent(App);