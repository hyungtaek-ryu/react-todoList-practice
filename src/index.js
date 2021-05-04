import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import todoApp from "./reducer/reducers";
//redux
import thunkMiddleware from 'redux-thunk'
import {createStore,applyMiddleware} from "redux";
import { Provider } from "react-redux";


const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

//action 의 리턴값이 object 형식이 아닐 경우(funtion 일 경우(비동기 호출을 위한..)) store 생성 시 thunkMiddleware 추가가 필요함.
const store = createStoreWithMiddleware(todoApp);
//let store = createStore(todoApp);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
