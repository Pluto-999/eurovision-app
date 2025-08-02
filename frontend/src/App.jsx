import { Routes, Route } from "react-router-dom"
import ResultsRoutes from "./routes/ResultsRoutes"
import EntriesRoutes from "./routes/EntriesRoutes"
import AccountRoutes from "./routes/AccountRoutes"
import UserRoutes from "./routes/UserRoutes"
import HomePage from "./pages/HomePage"
import CountriesPage from "./pages/CountriesPage"
import FriendsRoutes from "./routes/FriendsRoutes"
import UserStatsRoutes from "./routes/UserStatsRoutes"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"
import socket from "./socket"

function App() {
  useEffect(() => {
    axios.get("http://localhost:3000/api/user/home", 
      { withCredentials: true }
    )
    .then(() => {
      if (!socket.connected) {
        socket.connect()
      }
    })
    .catch(() => {
      console.log("user hasn't logged in or registered yet ...")
    })
  })
  
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
        <Route path="/user_stats/*" element={<UserStatsRoutes />} />
        <Route path="/chat/:username" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


    </div>
  )
}

export default App
