import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { useEffect, useState } from "react";
import MainLayout from "./components/MainLayout";
import './App.css'
import { WorkoutServices } from "./services/WorkoutServices";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Auth/Login";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes";

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
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     setIsAuthenticated(true)
  //   }
  //   else {
  //     setIsAuthenticated(false)
  //   }
  // }, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <Login/> */}
          {isAuthenticated ?
            <AuthenticatedRoutes />
            :
            <UnAuthenticatedRoutes />
          }
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
