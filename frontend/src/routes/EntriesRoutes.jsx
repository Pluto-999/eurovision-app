import { Routes, Route } from "react-router-dom"
import CountryAllEntriesPage from "../pages/CountryAllEntriesPage"

function EntriesRoutes() {
    return (
        <Routes>
            <Route path="/country/:country" element={<CountryAllEntriesPage />}/>
            
        </Routes>
    )
}

export default EntriesRoutes