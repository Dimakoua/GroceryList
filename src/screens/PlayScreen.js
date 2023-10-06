import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
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
    const filtered = items.filter(x => !checkedItems.includes(x.id));
    setUncheckedItems(filtered);
  }, [items])


  const onSwipeableOpen = (item) => {
    toggleItemById(listId, item.id);
    const filtered = uncheckedItems.filter(x => x.id !== item.id);

    if (filtered.length) {
      setUncheckedItems(filtered);
    } else {
      navigation.goBack();
    }
  }

  const renderActions = (event) => {
    return (
      <View style={styles.rightActionsContainer}>
      </View>
    );
  };

  const renderItem = ({ index, item }) => {
    return <Swipeable
      leftThreshold={50}
      rightThreshold={50}
      renderRightActions={renderActions}
      renderLeftActions={renderActions}
      onSwipeableOpen={() => onSwipeableOpen(item)}
    >
      <TouchableOpacity
        style={{ height: 50, backgroundColor: 'blue' }}
      >
        <Text style={styles.ideaText}>{item.text}</Text>
        <Text style={styles.ideaText}>{item.quantity}</Text>
      </TouchableOpacity>
    </Swipeable>
  }

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
    padding: 16,
    backgroundColor: '#fff',
  },
  rightActionsContainer: {
    flex: 1
  },
  ideaText: {
    color: '#fff'
  }
});

export default PlayScreen;