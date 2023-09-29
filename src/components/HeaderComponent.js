import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const HeaderComponent = ({ onPress, onSearch }) => {
    const [isEditingSearch, setIsEditingSearch] = useState(false); // Додавання стану для визначення режиму редагування пошуку
    const [searchText, setSearchText] = useState(''); // Додавання стану для текстового пошуку

    const searchInputRef = useRef();

    const focusSearchInput = () => {
        if (searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 100)
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.buttons, isEditingSearch ? styles.hidden : null,]}>
                <TouchableOpacity
                    onPress={() => onPress('1')}
                >
                    <Text style={styles.listTitle}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onPress('2')}
                >
                    <Text style={styles.listTitle}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onPress('3')}
                >
                    <Text style={styles.listTitle}>3</Text>
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
    }
});

export default HeaderComponent;



