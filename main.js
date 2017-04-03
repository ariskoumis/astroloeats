import React from 'react';
import Expo, {
  Components, 
  Font
} from 'expo';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';

const videoSource = require('./assets/videos/loadingBG.mp4');
const loadingGIF = require('./assets/icons/loading.gif')
const crystalBall = require('./assets/icons/crystal-ball.png')

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      loggedIn: false,
      appIsReady: false,
      region: {
        longitude: 0,
        latitude: 0
      }
    }

    this.onLogIn = this.onLogIn.bind(this)
    this.handleRegionUpdate = this.handleRegionUpdate.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-italic': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Regular.ttf'),
      'vonique': require('./assets/fonts/Vonique-64.ttf')
    })
    await Expo.Asset.fromModule(videoSource).downloadAsync()
    await Expo.Asset.fromModule(loadingGIF).downloadAsync()
    await Expo.Asset.fromModule(crystalBall).downloadAsync()
    this.setState({
      appIsReady: true
    })
  }

  handleRegionUpdate(newRegion) {
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
    console.disableYellowBox = true;
    if (!this.state.appIsReady) {
      return <Components.AppLoading />
    }

    if (!this.state.loggedIn) {
      return <LoginScreen onLogIn={this.onLogIn} handleRegionUpdate={this.handleRegionUpdate}/>
    }
    
    return <HomeScreen region={this.state.region} handleLogout={this.handleLogout}/>
  }

}

Expo.registerRootComponent(App);