import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes";
import './App.css'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 0,
        staleTime: 5 * 1000, //cache expiry time
      },
    },
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
    else {
      setIsAuthenticated(false)
    }
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {isAuthenticated ?
            <AuthenticatedRoutes />
            :
            <UnAuthenticatedRoutes setIsAuthenticated={setIsAuthenticated} />
          }
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
