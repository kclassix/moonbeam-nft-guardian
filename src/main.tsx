
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize a comprehensive global error handler to catch and log errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Prevent white screen of death by displaying some content
  const rootElement = document.getElementById("root");
  if (rootElement && rootElement.innerHTML === '') {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h2>Something went wrong</h2>
        <p>The application encountered an error. Please try refreshing the page.</p>
        <button onclick="window.location.reload()">Refresh</button>
      </div>
    `;
  }
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  console.log("Starting application initialization");
  createRoot(document.getElementById("root")!).render(<App />);
  console.log("Application rendered successfully");
} catch (error) {
  console.error("Failed to render application:", error);
}
