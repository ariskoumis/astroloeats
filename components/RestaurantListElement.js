import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
	Linking,
	Platform
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Foundation';
import Phone from 'react-native-communications';

import toMiles from '../utils/toMiles';

export default class RestaurantListElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: true
		}
		this.handleFocus = this.handleFocus.bind(this)
		this.handleRestaurantCall = this.handleRestaurantCall.bind(this)
		this.handleWebsite = this.handleWebsite.bind(this)
		this.handleDirections = this.handleDirections.bind(this)

	}

	handleFocus() {
		var newRegion = {
			longitude: this.props.restaurant.coordinates.longitude,
			latitude: this.props.restaurant.coordinates.latitude,
			latitudeDelta: 0.0922,
          	longitudeDelta: 0.0421,
		}
		this.setState({collapsed: !this.state.collapsed})
		this.props.handleRegionUpdate(newRegion)
	}

	handleRestaurantCall() {
		var number = this.props.restaurant.phone
		Phone.phonecall(number, true)
	
	}

	handleDirections() {
		var address=this.props.restaurant.location.display_address[0].split(" ").join("+")
		var city=this.props.restaurant.location.city

		if (Platform.OS == "ios") {
			Linking.openURL('https://www.maps.apple.com/?q=' + address + '+' + city).catch(err => console.error('An error occurred', err));			
		} else {
			Linking.openURL('https://www.google.com/maps/search/' + address + '+' + city).catch(err => console.error('An error occurred', err));	
		}
	}

	handleWebsite() {
		Linking.openURL(this.props.restaurant.url).catch(err => console.error('An error occurred', err));
	}

	render() {
		return (
			<View style={{flex:1}}>
				<TouchableOpacity onPress={this.handleFocus} style={styles.container}>
					<Image style={styles.image} source={{uri: this.props.restaurant.image_url}} />
					<View style={styles.info}>
						<Text style={{fontWeight: "bold", fontSize: 14}}>{this.props.restaurant.name}</Text> 
						<Text style={{fontSize: 12}}>{this.props.restaurant.categories[0].title} - {this.props.restaurant.price} </Text>
						<Text style={{fontSize: 12}}>{toMiles(this.props.restaurant.distance)} miles away</Text>
					</View>
				</TouchableOpacity>
		        <Collapsible collapsed={this.state.collapsed} align="center">
		        	<View style={styles.collapsible}>
		        		<TouchableOpacity onPress={this.handleRestaurantCall} style={styles.collapsibleItem}>
		        			<Icon size={30} name="telephone" />
		        			<Text> Call </Text>
	        			</TouchableOpacity>
		        		<TouchableOpacity onPress={this.handleDirections} style={styles.collapsibleItem}>
		        			<Icon size={30} name="map" />
		        			<Text> Directions </Text>
	        			</TouchableOpacity>
	        			<TouchableOpacity onPress={this.handleWebsite} style={styles.collapsibleItem}>
		        			<Icon size={30} name="web" />
		        			<Text> Website </Text>
	        			</TouchableOpacity>
	        		</View>
		        </Collapsible>
	        </View>
		)
	}

	
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		borderStyle: 'solid'
	},
	info: {
		flexDirection: 'column',
		paddingLeft: 5
	},
	image: {
		height:50, 
		width:50,
		borderRadius:5
	},
	collapsible: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	collapsibleItem: {
		flexDirection: "column",
		alignItems: "center"
	}
})