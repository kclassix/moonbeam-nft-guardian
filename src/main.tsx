
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
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; max-height: 200px; margin-top: 10px;">${event.error?.message || 'Unknown error'}</pre>
        <button onclick="window.location.reload()" style="margin-top: 10px; padding: 8px 16px; background-color: #9c44dc; color: white; border: none; border-radius: 4px; cursor: pointer;">Refresh</button>
      </div>
    `;
  }
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Define a fallback UI function we can use
const renderFallbackUI = (rootElement: HTMLElement, error: any) => {
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Something went wrong</h2>
      <p>The application encountered an error during initialization:</p>
      <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; max-height: 200px; margin-top: 10px;">${error?.message || 'Unknown error'}</pre>
      <button onclick="window.location.reload()" style="margin-top: 10px; padding: 8px 16px; background-color: #9c44dc; color: white; border: none; border-radius: 4px; cursor: pointer;">Refresh</button>
    </div>
  `;
};

try {
  console.log("Starting application initialization");
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Add a data attribute to mark that we're initializing
  rootElement.setAttribute('data-initializing', 'true');
  
  createRoot(rootElement).render(<App />);
  
  // If we get here, mark initialization as complete
  rootElement.removeAttribute('data-initializing');
  console.log("Application rendered successfully");
} catch (error) {
  console.error("Failed to render application:", error);
  const rootElement = document.getElementById("root");
  if (rootElement) {
    renderFallbackUI(rootElement, error);
  }
}
