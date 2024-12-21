import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes";
import Notfound from "./pages/Notfound";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 0,
        staleTime: 5 * 1000, // Cache expiry time
      },
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication based on token existence
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isAuthenticated ?
          <AuthenticatedRoutes setIsAuthenticated={setIsAuthenticated} />
          : <UnAuthenticatedRoutes setIsAuthenticated={setIsAuthenticated}/>
        }
        {/* <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<AuthenticatedRoutes />} />
              <Route path="/*" element={<UnAuthenticatedRoutes setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Notfound />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<UnAuthenticatedRoutes setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Notfound />} />
            </>
          )}
        </Routes> */}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

