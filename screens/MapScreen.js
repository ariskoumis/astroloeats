import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';
import {
	Components
} from 'expo';

var height = Dimensions.get('window').width

export default class MapScreen extends React.Component {
	static route = {
		navigationBar: {
			title: "Map"
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Components.MapView
			        style={styles.map}
			        initialRegion={{
			          latitude: 37.78825,
			          longitude: -122.4324,
			          latitudeDelta: 0.0922,
			          longitudeDelta: 0.0421,
			        }}
		      	/>
		      	<Text style={styles.restaurantList}> Hi </Text>
	      	</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center'
	},
	map: {
		flex: 1,
	},
	restaurantList: {
		height: height * .6
	}
})