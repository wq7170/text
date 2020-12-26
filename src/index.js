import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
import App from './app';
import { Provider } from 'mobx-react';
import Store from './app/store';

async function bootPage() {
  const store = new Store();
  await store.initStore();

  ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

bootPage();


