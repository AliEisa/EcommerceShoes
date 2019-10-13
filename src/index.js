import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import storage from 'redux-persist/lib/storage';

import "./scss/style.scss";

import App from './components/App';
import reducers from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
    );
 
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>,
    document.querySelector('#root')
);