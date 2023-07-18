import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../auth/login"
import ForgotPassword from '../auth/forgotPassword';
import Map from "../common/map"
import { useSelector } from 'react-redux';
import Navigate from './Navigate';
import { DefaultTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    
    const { isLoggedIn } = useSelector(({ arboristLogin }) => arboristLogin)
    const theme = useMemo(() => ({
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#ECF4F3',
            text: 'lightgray',
            border: '#D9D9D9',
            primary: '#FFFFFF'
        },
    }), [])

    return (
        <NavigationContainer theme={theme}> 
            {!isLoggedIn ?
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="Map" component={Map} />

                </Stack.Navigator> : <Navigate />}
        </NavigationContainer>
    );
};

export default MyStack;