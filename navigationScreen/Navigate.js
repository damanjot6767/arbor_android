import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Suspense, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddClient from '../component/clients/addClient';
import Map from "../common/map"
import EditProfile from '../component/profile/editProfile';
import { Color } from '../constants/colors';

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
        options={{
          unmountOnBlur: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => {
                // Handle the plus icon button press event for the Report screen
              }}>
              <Icon name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
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
