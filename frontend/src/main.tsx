// Provides foundation for creating React components and using jsx syntax
import React from 'react'
// Used to create root DOM element and render React app.
import ReactDOM from 'react-dom/client'
// Root components thats contains all routing and state managment. Top level component.
import App from './App'
// // Global styles, those are aplyed for entire app. Place for global typograpgy, utility classes, and styles for all app
import './styles/globals.css'
// Sets up language translation capabilities for the app.
import './languages/i18n' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)