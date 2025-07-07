import { Routes, Route } from "react-router-dom"
import ResultsRoutes from "./routes/ResultsRoutes"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/results/*" element={<ResultsRoutes />}/>
        {/* BUNCH MORE ROUTES ... */}
      </Routes>


    </div>
  )
}

export default App
