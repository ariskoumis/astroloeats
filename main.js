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

    // var horoscope = "You've always been grounded, but now you're even more balanced than usual. Your goals and efforts are in line with your values, and that's a great state of being. You can put real work into something that means a lot to you, and enjoy the success you achieve. Be prepared to work hard, because this charmed influence doesn't last long. At least you can be assured it's worth all the work you'll put in. Time to map out your painstaking route to the top."

    // this.setState({
    //   horoscope: horoscope,
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