import { BrowserRouter } from "react-router-dom";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes";
import Dashboard from "./components/Dashboard";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  return (
    <>
      <BrowserRouter>
        {isAuthenticated ?
          <AuthenticatedRoutes />
          :
          <UnAuthenticatedRoutes />
        }
      </BrowserRouter>
    </>
  )
}

export default App
