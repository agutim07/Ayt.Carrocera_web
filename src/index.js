import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './admin/admin';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <React.StrictMode>
    <div style={{ backgroundImage: "linear-gradient(180deg, rgba(2,0,36,1) 1%, rgba(58,65,175,1) 31%, rgba(0,212,255,0.6951155462184874) 78%)"}}>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
    </div>
  </React.StrictMode>
  </Router>
);
