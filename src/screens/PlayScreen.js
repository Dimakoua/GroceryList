import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { useLists } from '../services/useLists';

const PlayScreen = ({ route }) => {
  const [uncheckedItems, setUncheckedItems] = useState([]);
  const navigation = useNavigation();
  const { toggleItemById } = useLists();

  const items = route.params?.items;
  const checkedItems = route.params?.checkedItems;
  const listId = route.params?.listId;

  useEffect(() => {
    const filtered = items.filter((x) => !checkedItems.includes(x.id));
    setUncheckedItems(filtered);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={uncheckedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        inverted={true}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const maxWidth = windowWidth - 80; // Subtract 40 from each side

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  }
});

export default PlayScreen;
