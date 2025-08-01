import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CategoryProvider} from './Components/contex/CategoryContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryProvider>

    <App />
    </CategoryProvider>

  </StrictMode>,
)
