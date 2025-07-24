import { Routes, Route } from "react-router-dom"
import UserStatsHomePage from "../pages/UserStatsHomePage"
import AllUserRankings from "../pages/AllUserRankings"

function UserStatsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UserStatsHomePage />} />
            <Route path="/ranking/:year" element={<AllUserRankings />}/>
        </Routes>
    )
}

export default UserStatsRoutes