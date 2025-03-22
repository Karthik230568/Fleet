import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Past from './Past.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Past />
  </StrictMode>,
)
