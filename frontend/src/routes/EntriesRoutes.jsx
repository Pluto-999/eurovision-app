import { Routes, Route } from "react-router-dom"
import IndividualCountryHomePage from "../pages/IndividualCountryHomePage"
import CountryIndividualEntryPage from "../pages/CountryIndividualEntryPage"

function EntriesRoutes() {
    return (
        <Routes>
            <Route path="/country/:country" element={<IndividualCountryHomePage />}/>
            <Route path="/:country/:year" element={<CountryIndividualEntryPage />} />
        </Routes>
    )
}

export default EntriesRoutes