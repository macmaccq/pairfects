import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

if (import.meta.env.DEV) {
  import('./data/validateContent.js').then(({ validateContent }) => {
    const problems = validateContent()
    if (problems.length > 0) {
      console.error(`[Pairfect] Content validation found ${problems.length} problem(s):\n- ${problems.join('\n- ')}`)
    }
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
