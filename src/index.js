import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
const root = ReactDOM.createRoot(document.getElementById('root'));
if(process.env.NODE_ENV === 'production'){
  disableReactDevTools();
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);