import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
 
   return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
   )
}

export default MyApp
