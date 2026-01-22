import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import CryptoData from './context/cryptoData.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
    <CryptoData>
      <App />
    </CryptoData>
  </BrowserRouter>
  </StrictMode>
)


