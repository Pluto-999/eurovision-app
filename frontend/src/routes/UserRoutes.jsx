import { Routes, Route } from "react-router-dom"
import UserHomePage from "../pages/UserHomePage"
import ChangeUserRating from "../pages/ChangeUserRating"
import CurrentUserRanking from "../pages/CurrentUserRanking"

function UserRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<UserHomePage />}/>
            <Route path="/change_rating/:country/:year" element={<ChangeUserRating />} />
            <Route path="/my_ranking/:year" element={<CurrentUserRanking />} />
        </Routes>
    )
}

export default UserRoutes