import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useLists } from '../services/useLists';
import { useFocusEffect } from '@react-navigation/native';
import HeaderComponent from '../components/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DISHES, MIXED, SHOPPING_ITEMS } from '../services/types';
import { setType } from '../store/filters';

function ShoppingListScreen({ navigation }) {
    const type = useSelector(state => state.filters.type);
    const lists = useSelector(state => state.lists.lists);
    const dispatch = useDispatch();

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

    const onSwipeGesture = (nativeEvent) => {
        if (nativeEvent.translationX > 50) {
            switch (type) {
                case MIXED:
                    dispatch(setType(DISHES));
                    break;
                case SHOPPING_ITEMS:
                    dispatch(setType(MIXED));
                    break;
                case DISHES:
                    dispatch(setType(SHOPPING_ITEMS));
                    break;
                default:
                    break;
            }
        } else if (nativeEvent.translationX < -50) {
            switch (type) {
                case MIXED:
                    dispatch(setType(SHOPPING_ITEMS));
                    break;
                case SHOPPING_ITEMS:
                    dispatch(setType(DISHES));
                    break;
                case DISHES:
                    dispatch(setType(MIXED));
                    break;
                default:
                    break;
            }
        }
    };

    const renderListItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => handleCardPress(item)}
            style={[
                styles.shoppingList,
                index % 2 === 0 ? styles.evenColumn : null,
            ]}
        >
            <Text style={styles.listTitle}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <PanGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                    onSwipeGesture(nativeEvent)
                }
            }}
        >
            <View style={styles.container}>
                <HeaderComponent onPress={handleHeaderPress} onSearch={onSearch} />

                {pinnedList.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Pinned</Text>
                        <FlatList
                            data={pinnedList}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            contentContainerStyle={styles.flatListContainer}
                            renderItem={renderListItem}
                        />
                    </View>
                )}

                <Text style={styles.sectionTitle}>Other</Text>
                <FlatList
                    data={notPinnedList}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.flatListContainer}
                    renderItem={renderListItem}
                />

                <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddNewCardPress}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Updated background color
        paddingHorizontal: 16,
    },
    shoppingList: {
        marginTop: 8, // Increased margin top for spacing
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
        flex: 1,
        margin: '1%',
    },
    evenColumn: {
        marginRight: 0,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333', // Updated text color
    },
    sectionTitle: {
        fontSize: 20, // Increased font size
        fontWeight: 'bold',
        marginTop: 16, // Added margin top for spacing
        marginBottom: 8, // Added margin bottom for spacing
        color: '#333', // Updated text color
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 24, // Increased bottom position
        right: 24, // Increased right position
    },
    addButton: {
        backgroundColor: '#FF6B6B', // Updated button color
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
