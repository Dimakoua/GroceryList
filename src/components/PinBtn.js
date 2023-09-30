import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useItems } from '../services/useItems';

const PinBtn = ({ isActive, onPress }) => {
    const handlePress = () => {
        onPress();
    };

    return (
        <View style={styles.backButton}>
            <TouchableOpacity
                onPress={handlePress}
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
        width: 35,
        height: 35
    }
});

export default PinBtn;
