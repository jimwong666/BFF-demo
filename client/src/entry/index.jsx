import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from '@router';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../store";
import {Provider} from "react-redux";
import simpleAsync from "@utils/reduxSimpleAsync";

import 'core-js/es6/map';
import 'core-js/es6/set';

const store = applyMiddleware(thunk, simpleAsync)(createStore)(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// console.log(store);
const render = (App) => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>
        ,document.getElementById('root'))
};

render(RootRouter);




