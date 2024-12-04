import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { useState } from "react";
import MainLayout from "./components/MainLayout";
import './App.css'
import { WorkoutServices } from "./services/WorkoutServices";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  WorkoutServices.getWorkouts()
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
