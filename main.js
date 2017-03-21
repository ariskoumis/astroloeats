import Expo, {Components} from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

import getAstrologicalSign from './utils/getAstrologicalSign';

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      loggedIn: true
    }
  }

  async componentDidMount() {
    await this._loadContentAsync()
    this.setState({
      appIsReady: true
    })
  }  

  _loadContentAsync = async () => {
    var sign = await getAstrologicalSign()
    const response = await fetch(`http://theastrologer-api.herokuapp.com/api/horoscope/${sign}/today`)
    var horoscope = JSON.parse(response._bodyText).horoscope
    var horoscopeTone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit

    this.setState({
        dailyHoroscope: horoscope,
        horoscopeTone: JSON.stringify(horoscopeTone),
        astrologicalSign: sign
      })
    }

  render() {
    if (!this.state.loggedIn) {
      return <LoginScreen onLogIn={this._onLogIn}/>
    } 
    else if (!this.state.appIsReady) {
      return <Components.AppLoading/>
    }

    return (
      <HomeScreen dailyHoroscope={this.state.dailyHoroscope} horoscopeTone={this.state.horoscopeTone} astrologicalSign={this.state.astrologicalSign} />
    )
  }

  _onLogIn = () => {
    this.setState({
      loggedIn: true
    })  
  }

}

Expo.registerRootComponent(App);