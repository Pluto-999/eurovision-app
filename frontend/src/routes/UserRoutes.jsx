import { Routes, Route } from "react-router-dom"
import UserHomePage from "../pages/user_pages/UserHomePage"
import CurrentUserRanking from "../pages/user_pages/CurrentUserRanking"
import UserSettingsPage from "../pages/user_pages/UserSettingsPage"
import ChangeProfilePicture from "../pages/user_pages/ChangeProfilePicture"
import ChangeUsername from "../pages/user_pages/ChangeUsername"

function UserRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<UserHomePage />}/>
            <Route path="/settings" element={<UserSettingsPage />}/>
            <Route path="/change_profile_picture" element={<ChangeProfilePicture />} />
            <Route path="/change_username" element={<ChangeUsername />} />
            <Route path="/my_ranking/:year" element={<CurrentUserRanking />} />
        </Routes>
    )
}

export default UserRoutes