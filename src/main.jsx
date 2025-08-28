import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Appmeteo from './componants/AppMeteo'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appmeteo/>
  </StrictMode>,
)
