import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLists } from '../services/useLists';
import { useFocusEffect } from '@react-navigation/native';
import HeaderComponent from '../components/HeaderComponent';
import { useSelector } from 'react-redux';
import { MIXED } from '../services/types';

function ShoppingListScreen({ navigation }) {
    const type = useSelector(state => state.filters.type);
    const lists = useSelector(state => state.lists.lists);

    const { searchLists, getListsByType } = useLists();
    const [pinnedList, setPinnedList] = useState([]);
    const [notPinnedList, setNotPinnedList] = useState([]);

    useEffect(() => {
        getListsByTypeWrap();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getListsByTypeWrap();
        }, [type, lists])
    );

    const getListsByTypeWrap = () => {
        const data = getListsByType(type);
        const pinnedList = data.filter(x => x.pinned)
        const notPinnedList = data.filter(x => !x.pinned)
        setPinnedList(pinnedList);
        setNotPinnedList(notPinnedList);
    }

    const handleHeaderPress = (listType) => {
        getListsByTypeWrap(listType);
    }

    const handleCardPress = (item) => {
        if (item.type === MIXED) {
            navigation.navigate('createMixedList', { item });
        } else {
            navigation.navigate('addList', { item });
        }
    }

    const handleAddNewCardPress = () => {
        const id = new Date().getTime().toString();

        if (type === MIXED) {
            navigation.navigate('createMixedList', { id });
        } else {
            navigation.navigate('addList', { id });
        }
    }

    const onSearch = async (text) => {
        const data = await searchLists(text, type);
        const pinnedList = data.filter(x => x.pinned)
        const notPinnedList = data.filter(x => !x.pinned)
        setPinnedList(pinnedList);
        setNotPinnedList(notPinnedList);
    }

    const ListComponent = (data) => {
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.flatListContainer}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => { handleCardPress(item) }}
                            style={[styles.shoppingList, index % 2 === 0 ? { marginRight: '5%' } : null,]}
                        >
                            <Text style={styles.listTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    return (
        <View style={styles.wrap}>
            <HeaderComponent onPress={handleHeaderPress} onSearch={onSearch} />
            {pinnedList.length ? (
                <View>
                    <Text>Pinned</Text>
                    {ListComponent(pinnedList)}
                </View>
            ) : null}
            <Text>Other</Text>
            {ListComponent(notPinnedList)}
            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddNewCardPress}
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
        // height: '100%'
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
    wrap: {
        height: '100%'
    }
});



export default ShoppingListScreen;
