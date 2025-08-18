import { Routes, Route } from "react-router-dom"
import IndividualCountryHomePage from "../pages/entries_pages/IndividualCountryHomePage"
import CountryIndividualEntryPage from "../pages/entries_pages/CountryIndividualEntryPage"

function EntriesRoutes() {
    return (
        <Routes>
            <Route path="/country/:country" element={<IndividualCountryHomePage />}/>
            <Route path="/:country/:year" element={<CountryIndividualEntryPage />} />
        </Routes>
    )
}

export default EntriesRoutes