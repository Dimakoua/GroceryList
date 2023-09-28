import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useItems } from '../services/useItems';
import { useFocusEffect } from '@react-navigation/native';

function ShoppingListScreen({ navigation }) {
    const [list, setList] = useState(null);
    const { getAllLists } = useItems();

    const fetchAllLists = async () => {
        try {
            const data = await getAllLists();
            setList(data);
        } catch (error) {
            console.error('Error fetching lists:', error);
        }
    };

    useEffect(() => {
        if (list === null) {
            fetchAllLists();
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchAllLists();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('addList', { item });
                        }}
                        style={[styles.shoppingList, index % 2 === 0 ? { marginRight: '5%' } : null,]}
                    >
                        <Text style={styles.listTitle}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        navigation.navigate('addList');
                    }}
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
        flexDirection: 'row', // Use row direction
        flexWrap: 'wrap',     // Allow items to wrap to the next row
        justifyContent: 'space-between', // Align items evenly between rows
    },
    shoppingList: {
        marginTop: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        width: '48%', // Adjust item width for two columns
        marginBottom: 16, // Add margin at the bottom of each item for spacing
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    addButton: {
        backgroundColor: 'rgb(222, 178, 150)',
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
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
});



export default ShoppingListScreen;
