import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Alert,
	ListView
} from 'react-native';
import {
	Components,
} from 'expo';
import RestaurantListElement from '../components/RestaurantListElement';

var height = Dimensions.get('window').width

export default class MapScreen extends React.Component {
	constructor(props) {
		super(props)

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			region: props.region,
			restaurantDataSource: ds.cloneWithRows(props.restaurants)
		}

		this.handleRegionUpdate = this.handleRegionUpdate.bind(this)
	}
	render() {
		return (
			<View style={styles.container}>
				<Components.MapView
			        style={styles.map}
			        initialRegion={{
			          latitude: this.props.region.latitude,
			          longitude: this.props.region.longitude,
			          latitudeDelta: 0.0922,
			          longitudeDelta: 0.0421,
			        }}
			        region={this.state.region}
		        >
			        {this.props.restaurants.map(restaurant => (
					    <Components.MapView.Marker
					    	key={restaurant.name}
					      	coordinate={restaurant.coordinates}
				    	  	title={restaurant.name}
				    	/>
				  	))}
		      	</Components.MapView>
		      	<ListView
		      		style = {{flex: 1}}
		      		dataSource = {this.state.restaurantDataSource}
		      		renderRow = {(restaurant) => 
		      			<RestaurantListElement style={styles.restaurantListElement} restaurant={restaurant} handleRegionUpdate={this.handleRegionUpdate}/>
		      		}
	      		/>
	      	</View>
		)
	}

	handleRegionUpdate(newRegion) {
		this.setState({
			region: newRegion
		})
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
	},
	restaurantListElement: {
		flex: .2
	}
})