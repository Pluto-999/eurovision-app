import { Routes, Route } from "react-router-dom"
import UserStatsHomePage from "../pages/user_stats_pages/UserStatsHomePage"
import AllUserRankings from "../pages/user_stats_pages/AllUserRankings"

function UserStatsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UserStatsHomePage />} />
            <Route path="/ranking/:year" element={<AllUserRankings />}/>
        </Routes>
    )
}

export default UserStatsRoutes