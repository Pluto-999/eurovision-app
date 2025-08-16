import { Routes, Route } from "react-router-dom"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import LogoutPage from "../pages/LogoutPage"
import AccountHomePage from "../pages/AccountHomePage"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"

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