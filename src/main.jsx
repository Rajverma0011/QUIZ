import React from 'react' // It's good practice to import React
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Render the App component directly without StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)