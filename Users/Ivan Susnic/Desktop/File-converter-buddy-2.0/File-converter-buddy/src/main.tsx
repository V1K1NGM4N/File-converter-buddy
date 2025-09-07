import { createRoot } from 'react-dom/client'
import App from './App-fallback.tsx'
import './index.css'

// Temporarily using fallback app to test if Clerk is causing the black screen
createRoot(document.getElementById("root")!).render(<App />);
