import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeErrorHandling } from './lib/error-handler'

// Initialize error handling before app starts
initializeErrorHandling();

// Performance monitoring
if ('performance' in window && 'PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('📊 Page load time:', entry.duration + 'ms');
      }
    }
  });

  observer.observe({ entryTypes: ['navigation', 'paint'] });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)