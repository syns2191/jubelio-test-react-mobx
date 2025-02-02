import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  ProductsStore from './stores/products';
import axios from 'axios';
axios.defaults.url = `${process.env.BACKEND_URL}`;
const stores = {
  ProductsStore
}
const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
      <Provider {...stores}>
        <App />
    </Provider>
      </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
