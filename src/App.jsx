import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { useState } from "react";
import MainLayout from "./components/MainLayout";
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <>
      <BrowserRouter>
        {isAuthenticated ?
          <AuthenticatedRoutes />
          :
          <MainLayout />
        }
      </BrowserRouter>
    </>
  )
}

export default App
