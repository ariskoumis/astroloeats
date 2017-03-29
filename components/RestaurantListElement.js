import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Foundation';

export default class RestaurantListElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: true
		}
		this.handleFocus = this.handleFocus.bind(this)
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.handleFocus} style={styles.container}>
					<Image style={styles.image} source={{uri: this.props.restaurant.image_url}} />
					<View style={styles.info}>
						<Text style={{fontWeight: "bold", fontSize: 14}}>{this.props.restaurant.name}</Text> 
						<Text style={{fontSize: 12}}>{this.props.restaurant.categories[0].title} - {this.props.restaurant.price} </Text> 
					</View>
				</TouchableOpacity>
		        <Collapsible collapsed={this.state.collapsed} align="center">
		        	<View style={styles.collapsible}>
		        		<View style={styles.collapsibleItem}>
		        			<Icon size={30} name="map" />
		        			<Text> Directions </Text>
	        			</View>
	        			<View style={styles.collapsibleItem}>
		        			<Icon size={30} name="telephone" />
		        			<Text> Call </Text>
	        			</View>
	        			<View style={styles.collapsibleItem}>
		        			<Icon size={30} name="web" />
		        			<Text> Website </Text>
	        			</View>
	        		</View>
		        </Collapsible>
	        </View>
		)
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