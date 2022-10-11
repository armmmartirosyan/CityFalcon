import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/style.scss';
import {Provider} from "react-redux";
import {legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from "./store/reducer";
import sagas from "./store/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
