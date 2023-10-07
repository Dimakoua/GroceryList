import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { useLists } from '../services/useLists';
import { useFocusEffect } from '@react-navigation/native';
import { shallowEqual, useSelector } from 'react-redux';
import { MIXED } from '../services/types';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function CardListComponent({ type, searchString }) {
    const { t } = useTranslation();
    const lists = useSelector(state => state.lists.lists, shallowEqual);

    const [pinnedList, setPinnedList] = useState([]);
    const [notPinnedList, setNotPinnedList] = useState([]);

    const { searchLists } = useLists();
    const navigation = useNavigation();

    useEffect(() => {
        getListsByTypeWrap();
    }, [searchString]);

    useFocusEffect(
        useCallback(() => {
            getListsByTypeWrap();
        }, [lists])
    );

    const getListsByTypeWrap = () => {
        const data = searchLists(searchString, type);
        const pinnedList = data.filter(x => x.pinned);
        const notPinnedList = data.filter(x => !x.pinned);
        setPinnedList(pinnedList);
        setNotPinnedList(notPinnedList);
    }

    const handleCardPress = (item) => {
        if (item.type === MIXED) {
            navigation.navigate('createMixedList', { id: item.id, type: type, item });
        } else {
            navigation.navigate('addList', { id: item.id, type: type, item });
        }
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

    return (
        <View style={styles.container}>
            {pinnedList.length ? <Text style={styles.sectionTitle}>{t('pinned')}</Text> : null}

            <View style={styles.columnContainer}>
                {pinnedList.map((item, index) => renderListItem(item, index))}
            </View>

            {notPinnedList.length ? <Text style={styles.sectionTitle}>{t('other')}</Text> : null}
            <View style={styles.columnContainer}>
                {
                    notPinnedList.map((item, index) => renderListItem(item, index))
                }
            </View>
            {notPinnedList.length === 0 && pinnedList.length === 0 ?
                <View style={styles.emptyListContainer}>
                    <Image source={require('./../../assets/icons8-todo-list-100.png')} />
                </View>
                : null}

        </View>
    );
}
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#EBEFF3',
        paddingHorizontal: 16,
        minHeight: windowHeight - 40
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pagerView: {
        flex: 1,
    },
    flexScrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    shoppingList: {
        flexBasis: '48%', // Adjust this value as needed to fit two columns
        marginTop: 16,
        backgroundColor: '#F3F6F9',
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
        fontSize: 12,
        marginTop: 10,
        color: '#8C9396',
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    }
});

export default CardListComponent;
