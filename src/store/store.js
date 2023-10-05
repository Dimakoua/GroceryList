import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers'; // Import your rootReducer

const persistConfig = {
    key: 'root', // Key for storage
    storage: AsyncStorage, // Use AsyncStorage for React Native
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware({
        //     immutableCheck: false,
        //     serializableCheck: false, // Disable serializableCheck for Redux Persist
        // }),
        process.env.NODE_ENV === 'development'
            ? getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            })
            : getDefaultMiddleware()
});

const persistor = persistStore(store);

export { store, persistor };
