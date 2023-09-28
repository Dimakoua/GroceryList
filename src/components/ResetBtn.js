import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useItems } from '../services/useItems';

const ResetBtn = ({ listId, onPress }) => {
    return (
        <View style={styles.backButton}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.settingsButton}
            >
                <Image source={require('./../../assets/icons8-reset-50.png')} style={styles.image} />
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

export default ResetBtn;
