import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './RouterApp.jsx';
import './styles.css';
import './guides.css';
import 'leaflet/dist/leaflet.css';
import './app.css';
import './loading.css';
import './map.css';
import './brand-font.css';
import './route-assets.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>,
);