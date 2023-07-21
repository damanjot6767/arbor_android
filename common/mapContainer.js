import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useEffect, useState, useRef } from 'react';
import { Color } from "../constants/colors"
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
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
  iconButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  gps: {
    borderWidth: 1,
    borderColor: Color.white,
    backgroundColor: Color.white
  }

});

const MapContainer = ({reportData, setReportData}) => {
  const mapRef = useRef(null)
  const [selectedLocation, setSelectedLocation] = useState(initialRegion);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [state, setState] = useState(null)


  const handleRegionChange = (region) => {
    console.log("region", region)
    setSelectedLocation({...selectedLocation, latitude:region.latitude, longitude:region.longitude});
    setReportData({
      ...reportData,
      treeLat: region.latitude,
      treeLong: region.longitude,
    })
  };

  useEffect(() => {
    checkLocationPermission()
  }, [])

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
        setCurrentLocation({ ...selectedLocation, latitude: position.coords.latitude, longitude: position.coords.longitude })
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  const handleGps = () => {
    setSelectedLocation(currentLocation)
  }

  const takeSnapshot = () => {
    const snapshot = mapRef?.current?.takeSnapshot({
      width: 300,      // optional, when omitted the view-width is used
      height: 300,     // optional, when omitted the view-height is used    // iOS only, optional region to render
      format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file'   // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then((uri) => {
      setState({ mapSnapshot: uri });
    });
  }
  const handleLoadMap = () => {
    if (reportData?.property && reportData.property?.propertyLocation?.coordinates[1] !== 0) {
      setSelectedLocation({
        ...selectedLocation,
        latitude: reportData.property?.propertyLocation?.coordinates[1],
        longitude: reportData.property?.propertyLocation?.coordinates[0]
      })
      setReportData({
        ...reportData,
        treeLat: reportData.property?.propertyLocation?.coordinates[1],
        treeLong: reportData.property?.propertyLocation?.coordinates[0],
        treeAddress: reportData?.property?.location
      })
    }
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        onLayout={handleLoadMap}
        style={styles.map}
        mapType='satellite'
        onRegionChangeComplete={handleRegionChange}
        region={selectedLocation}
      >
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        />
      </MapView>
      {/* <View style={styles.iconButtonContainer}>
        <IconButton
          icon="crosshairs-gps"
          iconColor={Color.main}
          style={styles.gps}
          size={22}
          onPress={handleGps}
        />
      </View> */}
      {/* <View >
        <IconButton
          icon="camera"
          iconColor={Color.main}
          style={styles.gps}
          size={22}
          onPress={takeSnapshot}
        />
      </View> */}
    </View>
  )
}

export default MapContainer