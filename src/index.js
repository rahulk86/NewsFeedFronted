import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/home">
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
          {/* Add more routes if needed */}
        </Routes>
      </AuthProvider>
      <ToastContainer
        autoClose={6000}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
