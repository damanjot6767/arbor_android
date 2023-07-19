import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Suspense, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddClient from '../component/clients/addClient';
import Map from "../common/map"
import EditProfile from '../component/profile/editProfile';
import { Color } from '../constants/colors';
import MultiStepForm from '../component/reports/addReport';
import MapContainer from '../common/mapContainer';

const LazyTabComponent = React.lazy(() => import('./TabsNavigate'));
const LazyReportComponent = React.lazy(() => import('../component/reports'));

const Stack = createNativeStackNavigator();

const ReportWrapper = props => (
  <Suspense
    fallback={
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    }>
    <LazyReportComponent {...props} />
  </Suspense>
);

const TabWrapper = props => (
  <Suspense
    fallback={
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    }>
    <LazyTabComponent {...props} />
  </Suspense>
);

export default function Navigate() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#ECF4F3', borderBottomWidth: 1 },
        headerTitleStyle: {
          color: Color.main,
        },
        animationEnabled: false,
      }}>
      <Stack.Screen
        name="TabsStack"
        component={TabWrapper}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen name="Add Client" component={AddClient} />
      <Stack.Screen
        name="Report List"
        component={ReportWrapper}
        options={({ navigation }) => ({
          unmountOnBlur: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => {
                navigation.navigate('Add Report')
              }}>
              <Icon name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Add Report"
        component={MultiStepForm}
        options={() => ({
          headerRight: () => (
            <Button
              onPress={()=>console.log("save")}
              textColor={Color.main}
              labelStyle={{ fontSize: 16 }}
            >
              Save
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="Map"
        component={MapContainer}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
