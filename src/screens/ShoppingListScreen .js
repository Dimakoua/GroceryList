import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useItems } from '../services/useItems';
import { useFocusEffect } from '@react-navigation/native';

function ShoppingListScreen({ navigation }) {
    const [list, setList] = useState(null);
    const { getAllLists, getShoppingLists, getDishesList, getListById, upsertList, deleteListById } = useItems();

    const fetchAllLists = () => {
        getAllLists().then(x => setList(x));
    }
    
    useEffect(() => {
        if (list === null) {
            fetchAllLists();
        }
    }, [])

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
                numColumns={2} // Set the number of columns to 2
                contentContainerStyle={styles.flatListContainer} // Apply styles to the FlatList container
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("addList", {item}) }}
                        style={styles.shoppingList}
                    >
                        <Text style={styles.listTitle}>{item.name}</Text>
                    </TouchableOpacity>
                )
                }
            />

            < View style={styles.buttonContainer} >
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => { navigation.navigate("addList") }}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View >
        </View >
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
        backgroundColor: 'white', // Card background color
        borderRadius: 8, // Card border radius
        padding: 16, // Card padding
        shadowColor: '#000', // Shadow color
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 2, // Shadow radius
        elevation: 2, // Android elevation for shadow
        width: '45%'
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
        backgroundColor: 'rgb(222, 178, 150)',
        width: 54,
        height: 54,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 16,
        right: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
    flatListContainer: {
        justifyContent: 'space-between',
    },
});


export default ShoppingListScreen;
