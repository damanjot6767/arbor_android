import React, { useState } from 'react'
import {
    Text,
    View,
    Alert,
    StyleSheet
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import { Color } from "../constants/colors"
import { isValidEmail } from "../common/validations/validation"
import { forgotPass, generateCode } from '../actions/arborLogin';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = ({navigation}) => {
    const dispatch = useDispatch()
    const { forgotPasswordEmail } = useSelector(({ arboristLogin }) => arboristLogin)

    const [email, setEmail] = useState(forgotPasswordEmail?.email ? forgotPasswordEmail.email:"")
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [codeSent, setCodeSent] = useState(false)

    console.log(codeSent)
    console.log(email)
    const handleCode = () => {
        if (!email || !isValidEmail(email)) {
            Alert.alert(
                'Error !',
                'Please Enter valid email',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                        style: styles.error, // 'default', 'cancel', 'destructive'
                    },

                    // Add more buttons with styles here.
                ],
            );
        }
        else {
            const res = {
                email: email
            }
            dispatch(generateCode(res, setCodeSent))
        }
    }

    const handleResetPassword = () => {
        const res ={
            email:email,
            code:code,
            password:password
        }
        dispatch(forgotPass(res, navigation))
    }
    return (
        <View style={styles.body}>
            <TextInput
                label="Email"
                mode="outlined"
                textColor={Color.black}

                // left={<TextInput.Icon icon="email" />}
                theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                style={styles.input}
                value={email}
                onChangeText={(email) => setEmail(email)}
            />
            {codeSent &&
                <>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TextInput
                            label="Confirmation code"
                            mode="outlined"
                            textColor={Color.black}

                            // left={<TextInput.Icon icon="email" />}
                            theme={{ colors: { primary: Color.gray, outline: Color.gray } }}
                            style={styles.input}
                            value={code}
                            onChangeText={(code) => setCode(code)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TextInput
                            label="Password"
                            mode="outlined"
                            textColor={Color.black}

                            // left={<TextInput.Icon icon="email" />}
                            theme={{ colors: { primary: Color.gray, outline: Color.gray, text:'red' } }}
                            style={styles.input}
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                </>

            }
            <View style={{ flexDirection: 'row-reverse', marginVertical: 15 }}>
                {!codeSent ?
                    <Button
                        style={styles.button}
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        mode="contained"
                        labelStyle={{ fontSize: 15, marginRight: 28 }}
                        buttonColor={Color.main}
                        onPress={handleCode}>
                        Request Code
                    </Button> :
                    <Button
                        style={styles.button}
                        disabled={code && password ? false : true}
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        mode="contained"
                        labelStyle={{ fontSize: 15, marginRight: 28 }}
                        buttonColor={Color.main}
                        onPress={handleResetPassword}>
                        Confirm
                    </Button>}
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
        fontSize: 18,
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

export default ForgotPassword