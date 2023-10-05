import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useLists } from '../services/useLists';
import { useFocusEffect } from '@react-navigation/native';
import HeaderComponent from '../components/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DISHES, MIXED, SHOPPING_ITEMS } from '../services/types';
import { setType } from '../store/filters';
import PagerView from 'react-native-pager-view';

function ShoppingListScreen({ navigation }) {
    const type = useSelector(state => state.filters.type);
    const lists = useSelector(state => state.lists.lists);
    const dispatch = useDispatch();

    const { searchLists, getListsByType } = useLists();
    const [pinnedList, setPinnedList] = useState([]);
    const [notPinnedList, setNotPinnedList] = useState([]);

    const pagerRef = useRef(null);

    useEffect(() => {
        getListsByTypeWrap();
    }, []);

    useFocusEffect(
        useCallback(() => {

            if (pagerRef) {
                const matcher = {
                    [SHOPPING_ITEMS]: 0,
                    [MIXED]: 1,
                    [DISHES]: 2
                }

                pagerRef.current.setPage(matcher[type]);
            }


            getListsByTypeWrap();
        }, [type, lists])
    );

    const getListsByTypeWrap = () => {
        const data = getListsByType(type);
        const pinnedList = data.filter(x => x.pinned);
        const notPinnedList = data.filter(x => !x.pinned);
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
        const pinnedList = data.filter(x => x.pinned);
        const notPinnedList = data.filter(x => !x.pinned);
        setPinnedList(pinnedList);
        setNotPinnedList(notPinnedList);
    }

    const handlePageChange = (event) => {
        const { position } = event.nativeEvent;

        const matcher = {
            0: SHOPPING_ITEMS,
            1: MIXED,
            2: DISHES
        }

        dispatch(setType(matcher[position]));
    }

    const renderListItem = (item, index) => (
        <TouchableOpacity
            onPress={() => handleCardPress(item)}
            style={[styles.shoppingList, index % 2 === 0 ? styles.evenColumn : null]}
            key={item.id}
        >
            <Text style={styles.listTitle}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderMainList = (
        <View style={styles.container}>
            {pinnedList.length ? <Text style={styles.sectionTitle}>Pinned</Text> : null}

            <View style={styles.columnContainer}>
                {pinnedList.map((item, index) => renderListItem(item, index))}
            </View>

            {notPinnedList.length ? <Text style={styles.sectionTitle}>Other</Text>: null}
            <View style={styles.columnContainer}>
                {
                    notPinnedList.map((item, index) => renderListItem(item, index))
                }
            </View>
        </View>
    )

    return (
        <View>
            <ScrollView style={styles.flexContainer}>
                <HeaderComponent onPress={handleHeaderPress} onSearch={onSearch} />

                <PagerView style={styles.pagerView} ref={pagerRef} onPageSelected={handlePageChange} initialPage={1}>
                    <View key="1">
                        {renderMainList}
                    </View>
                    <View key="2">
                        {renderMainList}
                    </View>
                    <View key="3">
                        {renderMainList}
                    </View>
                </PagerView>
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddNewCardPress}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
    },
    flexContainer: {
        // flex: 1
    },
    pagerView: {
        minHeight: windowHeight
    },
    shoppingList: {
        flexBasis: '48%', // Adjust this value as needed to fit two columns
        marginTop: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    evenColumn: {
        marginRight: 0,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 16,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#FF6B6B',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 6,
        marginBottom: 16,
        marginRight: 16,
        position: 'absolute',
        bottom: 16,
        right: 16
    },
    buttonText: {
        color: '#fff',
        fontSize: 32,
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    }
});

export default ShoppingListScreen;
