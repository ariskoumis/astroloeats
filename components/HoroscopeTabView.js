import React from 'react';
import { View, StyleSheet } from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';

export default class HoroscopeTabView extends React.Component {
	state = {
		index: 0,
		routes: [
			{ key: '1', title: 'Horoscope' },
			{ key: '2', title: "Mood" },
			{ key: '3', title: 'Food'}
		]
	}

	_handleChangeTab = (index) => {
		this.setState({ index })
	}

	_renderHeader = (props) => {
		return <TabBar {...props} />
	}

	_renderScene = ({ route }) => {
		switch (route.key) {
		case '1':
			return <View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
		case '2':
			return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
		case '3':
			return <View style={[ styles.page, { backgroundColor: '#b7533a' } ]} />;
		default:
			return null;
		}
	};


	render() {
		return (
			<TabViewAnimated
				style={styles.container}
				navigationState={this.state}
				renderScene={this._renderScene}
				renderHeader={this._renderHeader}
				onRequestChangeTab={this._handleChangeTab}
			/>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});