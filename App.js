import React from 'react';
import {
  Alert,
  Platform,
  View,
  Text,
  StyleSheet
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion
} from 'react-native-maps';
// import {
//   request,
//   PERMISSIONS
// } from 'react-native-permissions';
import * as geolib from 'geolib';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

// navigator.geolocation.getCurrentPosition(
//   position => {
//     console.log('lat: ' + position.coords.latitude.toFixed(4));
//     console.log('lng: ' + position.coords.longitude.toFixed(4));
//     console.log('time: ' + position.timestamp);
//
//     this.setState({
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//       error: null
//     });
//   },
//   error => this.setState({ error: error.message }),
//   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
// );

// <View style={styles.container}>
//   <MapView
//     style={styles.map}
//     region={this.getMapRegion()}
//     showUserLocation
//     followUserLocation
//     loadingEnabled
//   >
//     <Marker coordinate={this.getMapRegion()} />
//   </MapView>
// </View>
// <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
//   <Text>Latitude: {this.state.latitude}</Text>
//   <Text>Longitude: {this.state.longitude}</Text>
//   {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
// </View>

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 46.987471,
      longitude: 3.150616,
      error: null
    };
  }

  watchId;

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        console.log('lat: ' + position.coords.latitude);
        console.log('lng: ' + position.coords.longitude);
        const { latitude, longitude } = position.coords;
        this.setState({ latitude, longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 0, distanceFilter: 0 }
    );
  }

  componentDidUpdate() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});
