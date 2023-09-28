import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useItems } from '../services/useItems';

const TrashBtn = (params) => {
    const {deleteById} = useItems();
    // Handle the "Back" button press to navigate back to the previous screen
    const handlePress = () => {
        params.listId
    };

    return (
        <View style={styles.backButton}>
            <TouchableOpacity
                onPress={handlePress}
                style={styles.settingsButton}
            >
                <Image source={require('./../../assets/icons8-trash-48.png')} style={styles.image} />
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

export default TrashBtn;
