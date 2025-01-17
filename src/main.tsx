import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './index.css';
import AxiosInterceptor from './interceptors/AxiosInterceptor.tsx';
import AuthProvider from './interceptors/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AxiosInterceptor />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);