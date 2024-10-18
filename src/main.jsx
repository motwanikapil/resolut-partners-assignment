import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoadingProvider } from './contexts/LoadingContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LoadingProvider>
  </StrictMode>
)
