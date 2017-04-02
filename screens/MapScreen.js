import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Alert,
	ListView,
	Picker,
	TouchableOpacity
} from 'react-native';
import {
	Components,
} from 'expo';

import RestaurantListElement from '../components/RestaurantListElement';

var height = Dimensions.get('window').height
var id = 1

export default class MapScreen extends React.Component {
	constructor(props) {
		super(props)
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			region: props.region,
			restaurantDataSource: ds.cloneWithRows(props.restaurants),
			ds: ds,
			pickerValue: "distanceUp",
			activeRow: null
		}
		this.handleRegionUpdate = this.handleRegionUpdate.bind(this)

		this.sortByDistance('up')
	}

	handleRegionUpdate(newRegion) {
		this.setState({
			region: newRegion
		})
	}

	handleRowFocus(index) {
		this.setState({
			activeRow: index
		})
	}

	sortList(option) {
		this.refs.restaurantList.scrollTo({y: 0})
		this.setState({
			pickerValue: option
		})

		switch(option) {
			case 'distanceUp':
				this.sortByDistance('up')
				break
			case 'distanceDown':
				this.sortByDistance('down')
				break
			case 'ratingUp':
				this.sortByRating('up')
				break
			case 'ratingDown':
				this.sortByRating('down')
				break
			case 'priceUp':
				this.sortByPrice('up')
				break
			case 'priceDown':
				this.sortByPrice('down')
				break
		}
	}

	sortByDistance(direction) {
		var booleanValue = -1
		if (direction == "down") {
			booleanValue = 1
		}

		let sortedDeals = this.props.restaurants.sort((a,b) => {
			if (a.distance < b.distance) {
			    return booleanValue;
	  		}
		  	if (a.distance > b.distance) {
			    return -1*booleanValue;
		  	}
			  // a must be equal to b
		  	return 0;
		});
			
		let dataSource = this.state.ds.cloneWithRows(sortedDeals) 

		this.setState({
		    restaurantDataSource: dataSource
		});
	}

	sortByRating(direction) {
		var booleanValue = -1
		if (direction == "down") {
			booleanValue = 1
		}

		let sortedDeals = this.props.restaurants.sort((a,b) => {
			if (a.rating < b.rating) {
			    return booleanValue;
	  		}
		  	if (a.rating > b.rating) {
			    return -1*booleanValue;
		  	}
			  // a must be equal to b
		  	return 0;
		});
			
		let dataSource = this.state.ds.cloneWithRows(sortedDeals) 

		this.setState({
		    restaurantDataSource: dataSource
		});
	}

	sortByPrice(direction) {
		var booleanValue = -1
		if (direction == "down") {
			booleanValue = 1
		}

		let sortedDeals = this.props.restaurants.sort((a,b) => {
			if (a.price.length < b.price.length) {
			    return booleanValue;
	  		}
		  	if (a.price.length > b.price.length) {
			    return -1*booleanValue;
		  	}
			  // a must be equal to b
		  	return 0;
		});
			
		let dataSource = this.state.ds.cloneWithRows(sortedDeals) 

		this.setState({
		    restaurantDataSource: dataSource
		});
	}

	

	render() {
		return (
			<View style={styles.container}>
				<Components.MapView
			        style={{flex: 1}}
			        initialRegion={{
			          latitude: this.props.region.latitude,
			          longitude: this.props.region.longitude,
			          latitudeDelta: 0.0922,
			          longitudeDelta: 0.0421,
			        }}
			        region={this.state.region}
		        >
			        <Components.MapView.Marker
				        image={require('../assets/icons/green-pin.png')}
				    	key={"Current Location"}
				      	coordinate={this.props.region}
			    	  	title={"Current Location"}
			    	/>
			        {this.props.restaurants.map(restaurant => (
					    <Components.MapView.Marker
					    	key={`${id++}`}
					      	coordinate={restaurant.coordinates}
				    	  	title={restaurant.name}
				    	/>
				  	))}
		      	</Components.MapView>
		      	<View style={styles.mask}>
		      		<Picker
		      			style={styles.picker}
		      			selectedValue={this.state.pickerValue}
		      			onValueChange={this.sortList.bind(this)} >
		      			<Picker.Item label="↑ Distance" value="distanceUp"/>
		      			<Picker.Item label="↓ Distance" value="distanceDown"/>
		      			<Picker.Item label="↑ Rating" value="ratingUp"/>
		      			<Picker.Item label="↓ Rating" value="ratingDown"/>
		      			<Picker.Item label="↑ Price" value="priceUp"/>
		      			<Picker.Item label="↓ Price" value="priceDown"/>
	      			</Picker>
      			</View>
		      	<ListView
		      		ref = {"restaurantList"}
		      		style = {{flex: 1}}
		      		dataSource = {this.state.restaurantDataSource}
		      		renderRow = {(restaurant) => 
		      			<RestaurantListElement restaurant={restaurant} handleRegionUpdate={this.handleRegionUpdate}/>
		      		}
	      		/>
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
	restaurantList: {
		height: height * .6
	},
	map : {
		flex: 1
	},
	mask: {
		height: 40,
		overflow: 'hidden',
		justifyContent: 'space-around'
	}
})