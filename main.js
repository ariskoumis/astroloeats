import Expo, {Components} from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
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
    this.state = {
      appIsReady: true,
      loggedIn: false
    }
    // this._handleLogIn = this._handleLogIn.bind(this)
  }


  render() {
    if (!this.state.appIsReady) {
      return <Components.AppLoading />
    }

    if (!this.state.loggedIn) {
      return <LoginScreen _onLogIn={this._onLogIn}/>
    }

    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }

  _onLogIn = () => {
    var newState = this.state
    newState.loggedIn = true
    this.setState(newState)
  }

}

Expo.registerRootComponent(App);