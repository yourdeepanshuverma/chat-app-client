import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <div onContextMenu={e => e.preventDefault()}>
        <App />
      </div>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={2000}
        newestOnTop={false}
        draggable
        theme="dark"
        transition={Bounce}
      />
    </Provider>
  </React.StrictMode>,
)
