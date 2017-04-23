import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

let lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0;

let counter = 0;
let distance = 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function setCoordinates(myCounter, lat, lon) {
  if (myCounter == 0) {
    lat1 = lat;
    lon1 = lon;
  }

  if (myCounter == 1) {
    lat2 = lat;
    lon2 = lon;
    
    ToastAndroid.show('Distance: ' + distanceCalc(lat1, lon1, lat2, lon2) + ' km', ToastAndroid.LONG)
  }
}

function distanceCalc(lat1, lon1, lat2, lon2) {
  
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default class SRTask extends Component {

  constructor() {
    super();
    
    this.state = {
      markers: []
    }

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {

      this.setState({
          markers: [
              ...this.state.markers,
              {
                coordinate: e.nativeEvent.coordinate, 
                cost: 'Marker ' + (counter + 1),
              } 
          ]
      })

      setCoordinates(counter, 
        e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
      counter++;
  }

  render() {
    return (

      // creating map view
      <MapView
      style = {styles.container}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}

      // what to do when map is pressed
      onPress = {this.handlePress}
      >

      { this.state.markers.map((marker) => {
        return (
          <Marker { ...marker } >
            <View style={styles.marker}>
              <Text>{ marker.cost } </Text>
            </View>
          </Marker>
          )  
      })}

      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end', //map will take up the entire screen
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 5,
    borderColor: "#ff0000",
    borderWidth: 2
  },
});

AppRegistry.registerComponent('SRTask', () => SRTask);
