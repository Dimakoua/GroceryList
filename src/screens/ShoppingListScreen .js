import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useItems } from '../services/useItems';
import { useFocusEffect } from '@react-navigation/native';

function ShoppingListScreen({ navigation }) {
    const [list, setList] = useState([]);
    const { getAllLists } = useItems();

    useEffect(() => {
        if(list.length === 0){
            fetchAllLists();
        }
    }, [])

    const fetchAllLists = () => {
        getAllLists().then(x => setList(x));
    }

    useFocusEffect(
        React.useCallback(() => {
           console.log("useFocusEffect");
           fetchAllLists();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.shoppingList}>
                        <Text style={styles.listTitle}>{item.name}</Text>
                    </View>
                )}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => { navigation.navigate("addList") }}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    shoppingList: {
        marginTop: 16,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'green',
        marginRight: 8,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
    },
    deleteButton: {
        color: 'red',
    },



    addButton: {
        backgroundColor: 'rgb(222, 178, 150)', // Same button background color as SettingsScreen
        width: 54, // Set a fixed width and height to make it circular
        height: 54,
        borderRadius: 32, // Half of the width/height to create a circle
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
        position: 'absolute', // Position it absolutely
        bottom: 16, // Adjust the bottom position for spacing
        right: 16, // Adjust the left position for spacing
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default ShoppingListScreen;
