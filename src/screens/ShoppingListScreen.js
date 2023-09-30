import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useItems } from '../services/useItems';
import { useFocusEffect } from '@react-navigation/native';
import HeaderComponent from '../components/HeaderComponent';

function ShoppingListScreen({ navigation }) {
    const { getAllLists, searchLists, getListsByType, SHOPPING_ITEMS } = useItems();
    const [list, setList] = useState(null);
    const [type, setType] = useState(SHOPPING_ITEMS);


    const fetchAllLists = async () => {
        const data = await getAllLists();
        setList(data);
    };

    useEffect(() => {
        if (list === null) {
            fetchAllLists();
        }
    }, [type]);

    useFocusEffect(
        React.useCallback(() => {
            getListsByTypeWrap(type);
        }, [])
    );

    const getListsByTypeWrap = async (listType) => {
        const data = await getListsByType(listType);
        setList(data);
    }

    const handleHeaderPress = async (listType) => {
        setType(listType);
        getListsByTypeWrap(listType);
    }

    const onSearch = async (text) => {
        const data = await searchLists(text);
        setList(data);
    }

    return (
        <View>
            <HeaderComponent onPress={handleHeaderPress} onSearch={onSearch} />
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
            </View>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        navigation.navigate('addList', { type });
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
        padding: 16,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row', // Use row direction
        flexWrap: 'wrap',     // Allow items to wrap to the next row
        justifyContent: 'space-between', // Align items evenly between rows
        height: '100%'
    },
    shoppingList: {
        marginTop: 4,
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
        marginBottom: 6, // Add margin at the bottom of each item for spacing
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: "10%",
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
