import React from 'react';
import { View, TouchableWithoutFeedback, TextInput, Image, StyleSheet, Dimensions } from 'react-native';

const ListRow = ({ index, item, textInputsRefs, setItemText, handleEnterPress, setItemQuantity, removeItem, toggleItem }) => {
    return (
        <View style={styles.checkboxWrap}>
            <TouchableWithoutFeedback onPress={() => toggleItem(item)}>
                <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
            </TouchableWithoutFeedback>
            <TextInput
                ref={(ref) => (textInputsRefs.current[index] = ref)} // Store the ref in the array
                value={item.text}
                onChangeText={(text) => setItemText(item, text)}
                onSubmitEditing={() => handleEnterPress(index)}
                style={[styles.input, { textDecorationLine: item.checked ? 'line-through' : 'none' }]}
            />
            <TextInput
                value={`${item.quantity}`}
                onChangeText={(quantity) => setItemQuantity(item, quantity)}
                keyboardType="numeric"
                style={styles.quantityInput}
            />
            <TouchableWithoutFeedback onPress={() => removeItem(item)}>
                <Image source={require('./../../assets/icons8-close-24.png')} style={styles.closeBtn} />
            </TouchableWithoutFeedback>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const maxWidth = windowWidth - 80; // Subtract 40 from each side

const styles = StyleSheet.create({
    checkboxWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        width: '100%',
        justifyContent: 'space-between',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'green',
        marginRight: 8,
    },
    input: {
        height: 40,
        marginBottom: 8,
        paddingHorizontal: 8,
        width: '50%',
        maxWidth: maxWidth,
    },
    quantityInput: {
        height: 40,
        marginBottom: 8,
        paddingHorizontal: 8,
        width: 40,
        textAlign: 'center',
    },
    closeBtn: {
        width: 20,
        height: 20,
        marginLeft: 8,
    },
});

export default ListRow;
