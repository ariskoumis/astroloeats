import Expo, {Components} from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import {
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation';

import Router from './navigation/Router';
import LoginScreen from './screens/LoginScreen';

class App extends React.Component {
  constructor() {
    super() 

    var loggedInVal = async () => {
      var alreadyLoggedIn = false

      try {
        birthday = await ASyncStorage.getItem('birthday')
        if (birthday !== null) {
          alreadyLoggedIn = true
        }
      } catch (err) {
        console.warn(err)
      }
      
      return alreadyLoggedIn
    }

    this.state = {
      appIsReady: true,
      loggedIn: loggedInVal
    }
  }


  render() {
    if (!this.state.appIsReady) {
      return <Components.AppLoading />
    }

    if (!this.state.loggedIn) {
      return <LoginScreen onLogIn={this._onLogIn}/>
    }

    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }

  _onLogIn = () => {
    this.setState({
      loggedIn: true
    })  
  }

}

Expo.registerRootComponent(App);