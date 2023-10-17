import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import { persistor, store } from '../Redux/store.js';
import { PersistGate } from 'redux-persist/lib/integration/react';
const theme = extendTheme({
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <App />
    </Provider>
  </React.StrictMode>,
)
