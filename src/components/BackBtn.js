import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const BackButton = ({onPress}) => {
    const navigation = useNavigation();

    // Handle the "Back" button press to navigate back to the previous screen
    const handleBackPress = () => {
        navigation.goBack();
        onPress();
    };

    return (
        <View style={styles.backButton}>
            <TouchableOpacity
                onPress={handleBackPress}
                style={styles.settingsButton}
            >
                <Image source={require('./../../assets/icons8-back-50.png')} style={styles.image} />
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

export default BackButton;
