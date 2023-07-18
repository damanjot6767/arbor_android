import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Color } from "../constants/colors"
import { check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const Map = () => {
    const [mLat, setMLat] = useState(0)
    const [mLong, setMLong] = useState(0)

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
                setMLat(position.coords.latitude)
                setMLong(position.coords.longitude)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    return (
        <View style={styles.body}>
            <View style={{ flexDirection: 'row-reverse', marginVertical: 15 }}>
                <Button
                    style={styles.button}
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    mode="contained"
                    labelStyle={{ fontSize: 20, marginRight: 28 }}
                    buttonColor={Color.main}
                    onPress={checkLocationPermission}
                >
                    Request Permission
                </Button>
            </View>

            <View>
                <Text>Your location is {mLat} and {mLong}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        margin: 40,
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        width: '100%',
        margin: 10,
    },
    button: {
        width: '90%',
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Map








