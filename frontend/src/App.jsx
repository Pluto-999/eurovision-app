import { Routes, Route } from "react-router-dom"
import ResultsRoutes from "./routes/ResultsRoutes"
import EntriesRoutes from "./routes/EntriesRoutes"
import AccountRoutes from "./routes/AccountRoutes"
import UserRoutes from "./routes/UserRoutes"
import HomePage from "./pages/HomePage"
import UserHomePage from "./pages/UserHomePage"
import CountriesPage from "./pages/CountriesPage"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div>
      <div><Toaster /></div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/results/*" element={<ResultsRoutes />} />
        <Route path="/entries/*" element={<EntriesRoutes />} />
        <Route path="/account/*" element={<AccountRoutes />} />
        <Route path="/user/*" element={<UserHomePage />}/>
        <Route path="/countries/*" element={<CountriesPage />} />
        {/* BUNCH MORE ROUTES ... */}
      </Routes>


    </div>
  )
}

export default App
