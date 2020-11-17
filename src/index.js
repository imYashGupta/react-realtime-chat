import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux"
import { createStore,combineReducers,applyMiddleware } from "redux";
import reducer from './store/reducer';
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  auth:reducer
});
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(ReduxThunk)
));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
