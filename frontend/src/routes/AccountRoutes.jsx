import { Routes, Route } from "react-router-dom"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import LogoutPage from "../pages/LogoutPage"
import AccountHomePage from "../pages/AccountHomePage"

function AccountRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AccountHomePage />}></Route>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />
        </Routes>
    )
}

export default AccountRoutes