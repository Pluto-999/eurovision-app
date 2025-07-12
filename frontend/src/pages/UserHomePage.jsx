import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import ResultsRoutes from "../routes/ResultsRoutes"
import { Link } from "react-router-dom"

function UserHomePage() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/api/user/home",
                { withCredentials: true })
        .then(response => {
            setUser(response.data.user)
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
            navigate("/account")
        })
    }, [])

    return (
        <>
            <h1> Welcome {user ? user.username : ""} </h1>
            <Link to="/account/logout"> Logout </Link>
            <ResultsRoutes />
        </>
    )
}

export default UserHomePage