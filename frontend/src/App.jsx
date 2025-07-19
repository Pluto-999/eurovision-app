import { Routes, Route } from "react-router-dom"
import ResultsRoutes from "./routes/ResultsRoutes"
import EntriesRoutes from "./routes/EntriesRoutes"
import AccountRoutes from "./routes/AccountRoutes"
import UserRoutes from "./routes/UserRoutes"
import HomePage from "./pages/HomePage"
import CountriesPage from "./pages/CountriesPage"
import FriendsRoutes from "./routes/FriendsRoutes"
import Chat from "./pages/Chat"
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
        <Route path="/user/*" element={<UserRoutes />}/>
        <Route path="/countries/*" element={<CountriesPage />} />
        <Route path="/friends/*" element={<FriendsRoutes />} />
        {/* BUNCH MORE ROUTES ... */}
        <Route path="/chat/*" element={<Chat />} />
      </Routes>


    </div>
  )
}

export default App
