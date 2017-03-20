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
	Location,
	Permissions
} from 'expo';

var height = Dimensions.get('window').width

export default class MapScreen extends React.Component {
	constructor() {
		super()

		this.state = {
			region: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0.0922,
	          	longitudeDelta: 0.0421	
			}
		}
	}

	componentDidMount() {
 		this._getCurrentLocation()
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

	_getCurrentLocation = async () => {
		var { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status === 'granted') {
			var currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
			this.setState({
				region: {
					latitude: currentLocation.coords.latitude,
				 	longitude: currentLocation.coords.longitude,
				 	latitudeDelta: 0.0922,
	          		longitudeDelta: 0.0421
			 	}
			})
		} else {
			Alert.alert("Error", "Please enable location services.")

		}
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