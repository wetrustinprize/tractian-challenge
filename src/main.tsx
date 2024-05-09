import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import './global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      <App />
    </QueryClientProvider>
  </>,
)
