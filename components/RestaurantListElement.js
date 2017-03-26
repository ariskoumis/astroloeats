import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';

export default class RestaurantListElement extends React.Component {
	constructor() {
		super()
		this.handleRegionUpdate = this.handleRegionUpdate.bind(this)
	}

	render() {
		return (
			<TouchableOpacity onPress={this.handleRegionUpdate} style={styles.container}>
				<Image style={styles.image} source={{uri: this.props.restaurant.image_url}} />
				<View style={styles.info}>
					<Text style={{fontWeight: "bold", fontSize: 14}}>{this.props.restaurant.name}</Text> 
					<Text style={{fontSize: 12}}>{this.props.restaurant.categories[0].title} - {this.props.restaurant.price} </Text> 
				</View>
			</TouchableOpacity>
		)
	}

	handleRegionUpdate() {
		var newRegion = {
			longitude: this.props.restaurant.coordinates.longitude,
			latitude: this.props.restaurant.coordinates.latitude,
			latitudeDelta: 0.0922,
          	longitudeDelta: 0.0421,
		}
		this.props.handleRegionUpdate(newRegion)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 5
		// alignItems: 'center'
	},
	info: {
		flexDirection: 'column',
		paddingLeft: 5
	},
	image : {
		height:50, 
		width:50,
		borderRadius:5
	}
})