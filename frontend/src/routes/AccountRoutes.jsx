import { Routes, Route } from "react-router-dom"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import AccountHomePage from "../pages/AccountHomePage"

function AccountRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AccountHomePage />}></Route>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}

export default AccountRoutes