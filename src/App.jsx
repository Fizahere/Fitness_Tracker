import { BrowserRouter } from "react-router-dom";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes";

function App() {

  return (
    <>
    <BrowserRouter>
<UnAuthenticatedRoutes/>
</BrowserRouter>
    </>
  )
}

export default App
