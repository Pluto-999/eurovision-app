import { Routes, Route } from "react-router-dom"
import UserHomePage from "../pages/UserHomePage"
import ChangeUserRating from "../pages/ChangeUserRating"

function UserRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<UserHomePage />}/>
            <Route path="/change_rating/:country/:year" element={<ChangeUserRating />} />
        </Routes>
    )
}

export default UserRoutes