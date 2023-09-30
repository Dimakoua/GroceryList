import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useType } from '../services/useType';
import { useDispatch } from 'react-redux';
import { setType } from '../store/filters';


const HeaderComponent = ({ onPress, onSearch }) => {
    const dispatch = useDispatch();
    const {SHOPPING_ITEMS, DISHES, ALL_LISTS} = useType();

    const [isEditingSearch, setIsEditingSearch] = useState(false); // Додавання стану для визначення режиму редагування пошуку
    const [currentButtonPressed, setCurrentButtonPressed] = useState(ALL_LISTS); // Додавання стану для визначення режиму редагування пошуку
    const [searchText, setSearchText] = useState(''); // Додавання стану для текстового пошуку

    const searchInputRef = useRef();

    const focusSearchInput = () => {
        if (searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 100)
        }
    };

    const handleButtonPress = (btnName) => {
        dispatch(setType(btnName));
        onPress(btnName);
        setCurrentButtonPressed(btnName);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.buttons, isEditingSearch ? styles.hidden : null,]}>
                <TouchableOpacity
                    style={[currentButtonPressed === SHOPPING_ITEMS ? styles.active : null,]}
                    onPress={() => handleButtonPress(SHOPPING_ITEMS)}
                >
                    <Text style={styles.listTitle}>List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[currentButtonPressed === ALL_LISTS ? styles.active : null,]}
                    onPress={() => handleButtonPress(ALL_LISTS)}

                >
                    <Text style={styles.listTitle}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[currentButtonPressed === DISHES ? styles.active : null,]}
                    onPress={() => handleButtonPress(DISHES)}

                >
                    <Text style={styles.listTitle}>Meals</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttons, isEditingSearch ? null : styles.hidden,]}>
                <TextInput
                    ref={searchInputRef}
                    style={styles.searchInput}
                    placeholder={'search'}
                    value={searchText}
                    blurOnSubmit={false}
                    onChangeText={(text) => {
                        setSearchText(text);
                        onSearch(text);
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    setIsEditingSearch(!isEditingSearch);
                    if (!isEditingSearch) {
                        focusSearchInput();
                    }

                }}
                style={styles.searchContainer}
            >
                <Image source={require('./../../assets/icons8-search-30.png')} style={styles.searchImage} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50
    },
    buttons: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    searchContainer: {
        position: 'absolute',
        right: 15,
        top: 10
    },
    searchImage: {
        width: 30,
        height: 30
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'rgb(150, 178, 222)',
        borderRadius: 16,
        paddingHorizontal: 16,
        alignSelf: 'center',
        width: '60%',
        height: 40
    },
    hidden: {
        display: 'none'
    },
    active: {
        backgroundColor: 'red',
        padding: 6,
        borderRadius: 6
    }
});

export default HeaderComponent;



