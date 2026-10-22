import { createRoot } from 'react-dom/client'
import '@fontsource/italiana/400.css'
import '@fontsource-variable/hanken-grotesk'
import App from './App.jsx'
import './styles.css'

// Obs: não usamos <StrictMode> de propósito. Em desenvolvimento ele executa cada
// render duas vezes, o que atrapalharia o contador do Laboratório do Virtual DOM.
createRoot(document.getElementById('root')).render(<App />)
