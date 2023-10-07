import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SHOPPING_ITEMS, DISHES, MIXED } from '../services/types';
import { useTranslation } from 'react-i18next';

const HeaderComponent = ({ onPress, onSearch, type }) => {
    const { t } = useTranslation();

    const [isEditingSearch, setIsEditingSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentButtonPressed, setCurrentButtonPressed] = useState(type);
    const searchInputRef = useRef();

    useEffect(() => {
        setCurrentButtonPressed(type);
    }, [type])

    const focusSearchInput = () => {
        if (searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 50)
        }
    };

    const handleButtonPress = (btnName) => {
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
                    <Text style={styles.listTitle}>{t('shopping_list')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[currentButtonPressed === MIXED ? styles.active : null,]}
                    onPress={() => handleButtonPress(MIXED)}

                >
                    <Text style={styles.listTitle}>{t('all')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[currentButtonPressed === DISHES ? styles.active : null,]}
                    onPress={() => handleButtonPress(DISHES)}

                >
                    <Text style={styles.listTitle}>{t('meals')}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttons, isEditingSearch ? null : styles.hidden,]}>
                <TextInput
                    ref={searchInputRef}
                    style={styles.searchInput}
                    placeholder={t('search')}
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
                    } else {
                        setSearchText('');
                        onSearch('');
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
        backgroundColor: '#EBEFF3',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50
    },
    buttons: {
        flex: 1,
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
        backgroundColor: 'rgba(182,180,181,0.5)',
        borderRadius: 10
    },
    listTitle: {
        padding: 10,
        fontSize: 16
    }
});

export default HeaderComponent;



