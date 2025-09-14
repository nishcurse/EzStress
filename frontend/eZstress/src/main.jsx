import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Scrollbar from './components/Scrollbar.jsx'

createRoot(document.getElementById('root')).render(
    <Scrollbar>
        <App />
    </Scrollbar>
)
