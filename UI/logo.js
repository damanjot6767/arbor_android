

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.body}>
            <View style={styles.image}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/images/logo1.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    image:{
        width:'95%',
        height:180,
    },
    tinyLogo:{
        width:'90%',
        margin:10,       
        height:'85%',
    }
});

export default Logo;
