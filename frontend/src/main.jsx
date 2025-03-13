import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { AnimatePresence } from "motion/react"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <BrowserRouter>
  <AnimatePresence>
    <App />
  </AnimatePresence>
  </BrowserRouter>
  </AuthProvider>
  </StrictMode>
)
