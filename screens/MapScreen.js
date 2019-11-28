import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.findCoordinates();
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        location: info.coords,
      });
    });
  };

  render() {
    console.log(this.state.location);
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
            }}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
