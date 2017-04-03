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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalPicker from '../components/react-native-modal-picker';


import RestaurantListElement from '../components/RestaurantListElement';

var height = Dimensions.get('window').height
var id = 1

let index = 0;
const data = [
{ key: 'distanceUp', label: '↑ Distance' },
{ key: 'distanceDown', label: '↓ Distance' },
{ key: 'priceUp', label: '↑ Price' },
{ key: 'priceDown', label: '↓ Price' },
{ key: 'ratingUp', label: '↑ Rating' },
{ key: 'ratingDown', label: '↓ Rating' }
];

export default class MapScreen extends React.Component {
	constructor(props) {
		super(props)
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			region: props.region,
			restaurantDataSource: ds.cloneWithRows(props.restaurants),
			ds: ds,
			pickerValue: "distanceUp",

		}
		this.handleRegionUpdate = this.handleRegionUpdate.bind(this)
		this.sortList = this.sortList.bind(this)

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
			pickerValue: option.key
		})

		console.log(option.key, typeof option.key)
		switch(option.key) {
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
		        <TouchableOpacity style={{position:'absolute',bottom:5,right:5,backgroundColor:'rgba(0,0,0,.2)'}}> 
					<ModalPicker
	      			data = {data}
	      			onChange = {this.sortList}
      				>
      				<Icon onPress={this.openSortingOptions} size={30} name="sort" />
      				</ModalPicker>
				</TouchableOpacity> 
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
		backgroundColor: "#FFE8A2",
		overflow: 'hidden',
		justifyContent: 'space-around'
	}
})