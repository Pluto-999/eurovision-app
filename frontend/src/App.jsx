 import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import ResultsRoutes from "./routes/ResultsRoutes"
import EntriesRoutes from "./routes/EntriesRoutes"
import AccountRoutes from "./routes/AccountRoutes"
import UserRoutes from "./routes/UserRoutes"
import HomePage from "./pages/HomePage"
import CountriesPage from "./pages/results_pages/CountriesPage"
import FriendsRoutes from "./routes/FriendsRoutes"
import UserStatsRoutes from "./routes/UserStatsRoutes"
import SearchRoutes from "./routes/SearchRoutes"
import Chat from "./pages/friends_pages/Chat"
import NotFound from "./pages/NotFound"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import api from "./utils/axios"
import socket from "./socket"
import "./index.css"
import "./styles/loading.css"
import ProtectedRoute from "./routes/ProtectedRoute"
import { useUserContext } from "./context/userContext"

function App() {
  const { user } = useUserContext()
  
  useEffect(() => {
    if (user && !socket.connected) {
      socket.connect()
    }
  }, [user])
  
  return (
    <>
      <div><Toaster /></div>
      <Navbar />
      <div className="main_page">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/results/*" element={<ResultsRoutes />} />
        <Route path="/entries/*" element={<EntriesRoutes />} />
        <Route path="/account/*" element={<AccountRoutes />} />
        <Route 
          path="/user/*" 
          element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/countries/*" element={<CountriesPage />} />
        <Route 
          path="/friends/*" 
          element={
            <ProtectedRoute>
              <FriendsRoutes />
            </ProtectedRoute>
          } 
        />
        <Route path="/user_stats/*" element={<UserStatsRoutes />} />
        <Route path="/search/*" element={<SearchRoutes />} />
        <Route 
          path="/chat/:username" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  )
}

export default App
