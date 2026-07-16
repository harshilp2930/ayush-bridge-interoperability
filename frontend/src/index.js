import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Load react-grab only in development via Webpack/CRA so the
// bare module specifier is resolved correctly.
if (process.env.NODE_ENV === 'development') {
  import('react-grab').catch((e) => {
    // Non-fatal: helpful dev tool only
    console.warn('react-grab not loaded', e);
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
