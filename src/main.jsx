import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const ignoredExtensionError =
  'A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received';

window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || String(event.reason || '');
  if (message.includes(ignoredExtensionError)) {
    event.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
