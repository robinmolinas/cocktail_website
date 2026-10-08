import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SoundToggle from './audio/SoundToggle.tsx'

// The sound control sits beside App, not inside it: it belongs to every
// screen alike and to the one audio director (src/audio), not to a phase.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <SoundToggle />
  </StrictMode>,
)
