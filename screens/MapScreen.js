import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Alert
} from 'react-native';
import {
	Components,
} from 'expo';

var height = Dimensions.get('window').width

export default class MapScreen extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)

		this.state = {
			region: {
				latitude: props.region.latitude,
				longitude: props.region.longitude,
				latitudeDelta: 0.0922,
	          	longitudeDelta: 0.0421	
			}
		}
	}

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
			          latitude: this.state.region.latitude,
			          longitude: this.state.region.longitude,
			          latitudeDelta: 0.0922,
			          longitudeDelta: 0.0421,
			        }}
			        region={this.state.region}
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