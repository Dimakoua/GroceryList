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
            navigation.navigate('createMixedList', { id: item.id, item });
        } else {
            navigation.navigate('addList', { id: item.id, item });
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

    const renderListItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => handleCardPress(item)}
            style={[
                styles.shoppingList,
                index % 2 === 0 ? { marginRight: '5%' } : null,
            ]}
        >
            <Text style={styles.listTitle}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <HeaderComponent onPress={handleHeaderPress} onSearch={onSearch} />
            <View style={styles.content}>
                {pinnedList.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pinned</Text>
                        <FlatList
                            data={pinnedList}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            renderItem={renderListItem}
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>
                )}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other</Text>
                    <FlatList
                        data={notPinnedList}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        renderItem={renderListItem}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddNewCardPress}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shoppingList: {
        flexBasis: '48%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
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
