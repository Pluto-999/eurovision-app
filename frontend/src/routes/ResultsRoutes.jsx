import { Routes, Route } from "react-router-dom"
import ResultsHomePage from "../pages/results_pages/ResultsHomePage"
import FinalResultsPage from "../pages/results_pages/FinalResultsPage"
import SemiResultsPage from "../pages/results_pages/SemiResultsPage"
import SingleResultsPage from "../pages/results_pages/SingleResultsPage"
import CountryResultsPage from "../pages/results_pages/CountryResultsPage"
import ResultsOverviewPage from "../pages/results_pages/ResultsOverviewPage"

function ResultsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ResultsOverviewPage />}/>
            <Route path="/all_results" element={<ResultsHomePage />}/>
            <Route path="/final/:year" element={< FinalResultsPage />} />
            <Route path="/semi/:semi_number/:year" element={<SemiResultsPage />} />
            {/* <Route path="/:country/:year" element={<SingleResultsPage />}/>
            <Route path="/:country" element={<CountryResultsPage />}/> */}
        </Routes>
    )
}

export default ResultsRoutes