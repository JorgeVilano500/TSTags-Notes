import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
        <App />
    </BrowserRouter>
)

// if you get error of ts modules not fount install  npm install --save-dev @types/react@latest @types/react-dom@latest  these packages 
//Cannot find module 'react/jsx-runtime' or its corresponding type declarations. ts error
