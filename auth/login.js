

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, SafeAreaView, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { Color } from "../constants/colors"
import { useDispatch, useSelector } from 'react-redux';
import { arboristAuth } from '../actions/arborLogin';
import { isValidEmail } from "../common/validations/validation"

const Login = ({ navigation }) => {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: "",
        password: "",
    })



    const handleEmailChange = (email) => {
        setData((prevData) => ({ ...prevData, email }));
    }
    const handlePassChange = (password) => {
        setData((prevData) => ({ ...prevData, password }));
    }


    const handleLogin = () => {
        if (!data.email && !data.password || !isValidEmail(data.email)) {
            Alert.alert(
                'Error !',
                'Please Enter valid email and password',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                        style: styles.error, // 'default', 'cancel', 'destructive'
                    },

                    // Add more buttons with styles here.
                ],
            );
            // onToggleSnackBar()
        } else {
            dispatch(arboristAuth(data))
        }
        // navigation.navigate('Map');
    }

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <View style={styles.body}>
                <View style={styles.image}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/images/logo1.png')}
                    />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.LoginText}>
                        Login
                    </Text>
                    <Text style={styles.text}>
                        Please sign in to continue
                    </Text>
                    <View style={styles.inputBoxes}>
                        {/* <Icon name="email" size={30} /> */}
                        <TextInput
                            label="Email"
                            mode="outlined"
                            textColor={Color.black}
                            left={<TextInput.Icon icon="email" />}
                            theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                            style={styles.input}
                            value={data.email}
                            onChangeText={handleEmailChange}
                        />
                        <TextInput
                            label='Password'
                            mode="outlined"
                            textColor={Color.black}
                            theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                            left={<TextInput.Icon icon="lock" />}
                            style={styles.input}
                            secureTextEntry
                            value={data.password}
                            onChangeText={handlePassChange}
                        />
                    </View>
                    <View style={{ width: "95%" }}>
                        <TouchableWithoutFeedback onPress={handleForgotPassword}>
                            <Text
                                style={{
                                    color: Color.gray,
                                    fontSize: 16,
                                    textAlign: 'right'
                                }}

                            >Forgot Password?
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', marginVertical: 15 }}>
                        <Button
                            style={styles.button}
                            icon={({ size, color }) => (
                                <Icon name="arrow-right" size={15} color={color} />
                            )}
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            mode="contained"
                            labelStyle={{ fontSize: 20, marginRight: 28 }}
                            buttonColor={Color.main}
                            onPress={handleLogin}>
                            Login
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        width: "100%",
        height: "100%",
      },
    body: {
        flex: 1,
        margin: 20,
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 220,
        alignItems: 'center',
    },
    tinyLogo: {
        height: '90%',
        width: '87%',

    },
    loginContainer: {
        width: '90%',

    },
    LoginText: {
        fontSize: 35,
        color: Color.black,
        fontWeight: 'bold',
        fontFamily: 'Open Sans',

    },
    text: {
        color: Color.gray,
        fontSize: 20,
        marginVertical: 5,

    },
    inputBoxes: {
        marginVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 18,
        marginVertical: 10,
    },
    button: {
        width: 150,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    }




});

export default Login;
