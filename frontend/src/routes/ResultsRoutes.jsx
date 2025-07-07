import { Routes, Route } from "react-router-dom"
import ResultsHomePage from "../pages/ResultsHomePage"
import FinalResultsPage from "../pages/FinalResultsPage"
import SemiResultsPage from "../pages/SemiResultsPage"
import SingleResultsPage from "../pages/SingleResultsPage"
import CountryResultsPage from "../pages/CountryResultsPage"

function ResultsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ResultsHomePage />}/>
            <Route path="/final/:year" element={< FinalResultsPage />} />
            <Route path="/semi/:semi_number/:year" element={<SemiResultsPage />} />
            <Route path="/:country/:year" element={<SingleResultsPage />}/>
            <Route path="/:country" element={<CountryResultsPage />}/>
        </Routes>
    )
}

export default ResultsRoutes