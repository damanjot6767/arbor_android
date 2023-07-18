import React from 'react';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ClientScreen from '../screens/ClientScreen';
import PropertyScreen from '../screens/PropertyScreen';
import { Button } from "react-native-paper"
import { Color } from '../constants/colors';
import { arboristLogout } from '../actions/arborLogin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../component/profile';
import { persistor } from '../store';

const TabsStack = createBottomTabNavigator();
export default function TabsNavigate() {

  const dispatch = useDispatch()
  const handleLogout = () => {
    Alert.alert(
      'ArborHawk',
      'Are you sure want to logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(arboristLogout())
            persistor.purge();
          },
        },
      ],
      { cancelable: false }
    );
  }


  return (
    <TabsStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: Color.main,
          height: 60,
          paddingBottom: 7,
          paddingTop: 10,
        },
        headerStyle: { backgroundColor: '#ECF4F3', borderBottomWidth: 1 },
        headerTitleStyle: {
          color: Color.main,
        },
      }}>
      <TabsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icon name="home" {...props} size={30} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Clients"
        component={ClientScreen}
        options={({ navigation }) => ({
          tabBarIcon(props) {
            return <Icon name="groups" {...props} size={30} />;
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('Add Client')}>
              <Icon name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <TabsStack.Screen
        name="Properties"
        component={PropertyScreen}
        options={({ navigation }) => ({
          tabBarIcon(props) {
            return <Icon name="store" {...props} size={30} />;
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('Add Property')}>
              <Icon name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />

      <TabsStack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => handleLogout()}
              textColor='red'
              labelStyle={{ fontSize: 16 }}
            >
              Logout
            </Button>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('Edit Profile')}>
              <Icon name="edit" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon(props) {
            return <Icon name="person" {...props} size={30} />;
          },
        })}

      />
    </TabsStack.Navigator>
  );
}

const styles = StyleSheet.create({});
