import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Color } from "../constants/colors"
import { check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const initialRegion = {
  latitude: 48.8146769,
  longitude: 2.2698459,
  latitudeDelta: 0.0015,
  longitudeDelta: 0.0015,
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //  height: 400,
    //  width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MapContainer = () => {
  const [selectedLocation, setSelectedLocation] = useState(initialRegion);


  const handleRegionChange = (region) => {
    setSelectedLocation(region);
  };
  useEffect(()=>{
    checkLocationPermission()
  },[])

  const checkLocationPermission = async () => {
    try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionStatus === RESULTS.DENIED) {
        requestLocation1Permission();
      } else if (permissionStatus === RESULTS.BLOCKED) {
        console.log('Location permission blocked');
      } else {
        getLocation();
      }
    } catch (error) {
      console.log('Error checking location permission:', error);
    }
  };

  const requestLocation1Permission = async () => {
    try {
      const requestStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (requestStatus === RESULTS.GRANTED) {
        getLocation();
      } else if (requestStatus === RESULTS.BLOCKED) {
        Alert.alert(
            'Location Permission Required',
            'Please enable location permission for this app in Settings.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => openSettings(),
              },
            ],
            { cancelable: false }
          );
        console.log('Location permission blocked');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

const getLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            setSelectedLocation({...selectedLocation, latitude: position.coords.latitude, longitude: position.coords.longitude})
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType='satellite'
        onRegionChangeComplete={handleRegionChange}
        region={selectedLocation}
      >
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude:selectedLocation.longitude,
          }}
        />
      </MapView>
    </View>
  )
}

export default MapContainer