/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainContainer from './navigation/MainContainer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store/store';
import './translations/i18n.config';
import ErrorComponent from './components/ErrorComponent';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorComponent>
          <MainContainer />
        </ErrorComponent>
      </PersistGate>
    </Provider>

  );
}


export default App;
