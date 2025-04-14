
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize a simple global error handler to catch and log errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

createRoot(document.getElementById("root")!).render(<App />);
