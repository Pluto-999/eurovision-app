import { Routes, Route } from "react-router-dom"
import UserHomePage from "../pages/UserHomePage"

function UserRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<UserHomePage />}/>
        </Routes>
    )
}

export default UserRoutes