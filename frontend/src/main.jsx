import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>

        <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,
)
