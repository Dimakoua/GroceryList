import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { DISHES, MIXED, SHOPPING_ITEMS } from '../services/types';
import PagerView from 'react-native-pager-view';
import CardListComponent from '../components/CardListComponent';
import useDebounced from '../services/useDebounced';

function ShoppingListScreen({ navigation }) {
    const [searchString, setSearchString] = useState('');
    const [type, setType] = useState(MIXED);
    const debouncedSearchString = useDebounced(searchString, 200);
    const pagerRef = useRef(null);

    const handleHeaderPress = (newType) => {
        setType(newType);

        if (pagerRef) {
            const matcher = {
                [SHOPPING_ITEMS]: 0,
                [MIXED]: 1,
                [DISHES]: 2
            }

            pagerRef.current.setPage(matcher[newType]);
        }
    }

    const handleAddNewCardPress = () => {
        console.log('handleAddNewCardPress', type);
        const id = new Date().getTime().toString();

        if (type === MIXED) {
            navigation.navigate('createMixedList', { id, type });
        } else {
            navigation.navigate('addList', { id, type });
        }
    }

    return (
        <View style={styles.flexContainer}>
            <HeaderComponent onPress={handleHeaderPress} onSearch={setSearchString} />

            <PagerView style={styles.pagerView} ref={pagerRef} initialPage={1}>
                <View key="1">
                    <ScrollView style={styles.flexScrollView} contentContainerStyle={styles.scrollViewContent}>
                        <CardListComponent type={SHOPPING_ITEMS} searchString={debouncedSearchString} />
                    </ScrollView>
                </View>
                <View key="2">
                    <ScrollView style={styles.flexScrollView} contentContainerStyle={styles.scrollViewContent}>
                        <CardListComponent type={MIXED} searchString={debouncedSearchString} />
                    </ScrollView>
                </View>
                <View key="3">
                    <ScrollView style={styles.flexScrollView} contentContainerStyle={styles.scrollViewContent}>
                        <CardListComponent type={DISHES} searchString={debouncedSearchString} />
                    </ScrollView>
                </View>
            </PagerView>

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
    flexContainer: {
        flex: 1,
    },
    pagerView: {
        flex: 1,
    },
    flexScrollView: {
        flex: 1,
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
    }
});

export default ShoppingListScreen;
