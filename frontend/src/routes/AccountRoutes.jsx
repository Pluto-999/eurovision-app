import { Routes, Route } from "react-router-dom"
import RegisterPage from "../pages/auth_pages/RegisterPage"
import LoginPage from "../pages/auth_pages/LoginPage"
import AccountHomePage from "../pages/auth_pages/AccountHomePage"
import ForgotPassword from "../pages/auth_pages/ForgotPassword"
import ResetPassword from "../pages/auth_pages/ResetPassword"
import LogoutPage from "../pages/auth_pages/LogoutPage"

function AccountRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AccountHomePage />}></Route>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="forgot_password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
    )
}

export default AccountRoutes