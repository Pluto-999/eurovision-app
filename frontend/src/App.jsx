import { Routes, Route } from "react-router-dom"
import ResultsRoutes from "./routes/ResultsRoutes"
import AccountRoutes from "./routes/AccountRoutes"
import HomePage from "./pages/HomePage"
import UserHomePage from "./pages/UserHomePage"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div>
      <div><Toaster /></div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/results/*" element={<ResultsRoutes />} />
        <Route path="/account/*" element={<AccountRoutes />} />
        <Route path="/userhome/*" element={<UserHomePage />}/>
        {/* BUNCH MORE ROUTES ... */}
      </Routes>


    </div>
  )
}

export default App
