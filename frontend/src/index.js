import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecipeContextProvider } from './context/RecipeContext';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the AuthProvider outside of RecipeContextProvider */}
    <AuthProvider>
      <RecipeContextProvider>
        <App />
      </RecipeContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
