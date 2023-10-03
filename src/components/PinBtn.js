import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PinBtn = ({ isActive, onPress }) => {
    return (
        <View style={styles.backButton}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.settingsButton}
            >
                {isActive ?
                    (<Image source={require('./../../assets/icons8-pin-full-50.png')} style={styles.image} />) :
                    (<Image source={require('./../../assets/icons8-pin-50.png')} style={styles.image} />)
                }


            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30
    }
});

export default PinBtn;
