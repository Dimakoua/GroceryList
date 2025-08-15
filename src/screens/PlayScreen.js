import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { useLists } from '../services/useLists';
import useErrors from '../services/useErrors';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackBtn';

const PlayScreen = ({ route }) => {
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const navigation = useNavigation();
  const { newError } = useErrors()
  const { toggleItemById } = useLists();
  const { t } = useTranslation();

  const items = route.params?.items;
  const checkedItems = route.params?.checkedItems;
  const listId = route.params?.listId;

  useEffect(() => {
    newError(t('Swipe items left or right'));

    const filtered = items.filter((x) => !checkedItems.includes(x.id));
    setUncheckedItems(filtered);

    let timerId = null;
    if (filtered.length === 0) {
      timerId = setTimeout(() => navigation.goBack(), 1000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [items]);

  const onSwipeableOpen = (item) => {
    toggleItemById(listId, item.id);
    const filtered = uncheckedItems.filter((x) => x.id !== item.id);

    if (filtered.length) {
      setUncheckedItems(filtered);
    } else {
      navigation.goBack();
    }
  };

  const renderActions = (event) => {
    return <View style={styles.rightActionsContainer}></View>;
  };

  const renderItem = ({ index, item }) => {
    return (
      <Swipeable
        leftThreshold={50}
        rightThreshold={50}
        renderRightActions={renderActions}
        renderLeftActions={renderActions}
        onSwipeableOpen={() => onSwipeableOpen(item)}
      >
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>{item.text}</Text>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const ListEmptyComponent = (
    <View style={styles.emptyListContainer}>
      <Image source={require('./../../assets/icons8-todo-list-100.png')} />
    </View>
  )

  const FlatListComponent = (
    <FlatList
      data={uncheckedItems}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      inverted={true}
    />
  )


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton />
      </View>

      {uncheckedItems.length ? FlatListComponent : ListEmptyComponent}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const maxWidth = windowWidth - 80; // Subtract 40 from each side

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEFF3',
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    width: '100%',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#F3F6F9',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 100
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#777',
  },
  rightActionsContainer: {
    flex: 1
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default PlayScreen;
