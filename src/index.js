import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ backgroundImage: "linear-gradient(180deg, rgba(2,0,36,1) 1%, rgba(58,65,175,1) 31%, rgba(0,212,255,0.6951155462184874) 78%)"}}>
    <App />
    </div>
  </React.StrictMode>
);
