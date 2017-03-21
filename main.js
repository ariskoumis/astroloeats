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
    var tone = (await fetch(`https://7k2wjhbn9c.execute-api.us-west-1.amazonaws.com/prod/analyzeText?horoscope=${encodeURI(horoscope)}`))._bodyInit

    this.setState({
        horoscope: horoscope,
        tone: JSON.stringify(tone),
        sign: sign
      })

    // this.setState({
    //   horoscope: "ho",
    //   tone: "yo",
    //   sign: "taurus"
    // })
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginScreen onLogIn={this._onLogIn}/>
    } 
    else if (!this.state.appIsReady) {
      return <Components.AppLoading/>
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