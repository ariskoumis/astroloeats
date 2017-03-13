import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation';

import Router from './navigation/Router';

class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }
}

Expo.registerRootComponent(App);
