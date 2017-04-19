import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
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
                cost: 'Yo!'
              } 
          ]
      })
  }

  render() {
    return (

      <MapView
      style = {styles.container}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}

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
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5
  }
});

AppRegistry.registerComponent('SRTask', () => SRTask);
