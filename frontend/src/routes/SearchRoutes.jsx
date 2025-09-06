import { Routes, Route } from "react-router-dom"
import SearchPage from "../pages/search_pages/SearchPage"

function SearchRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SearchPage />}></Route>
        </Routes>
    )
}

export default SearchRoutes