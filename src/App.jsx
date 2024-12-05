import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { useState } from "react";
import MainLayout from "./components/MainLayout";
import './App.css'
import { WorkoutServices } from "./services/WorkoutServices";
import { QueryClient, QueryClientProvider } from "react-query";

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
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isAuthenticated ?
          <AuthenticatedRoutes />
          :
          <MainLayout />
        }
      </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
