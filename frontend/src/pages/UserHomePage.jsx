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
            <h2> My Rankings </h2>
            <ul>
                <li><Link to="/user/my_ranking/2025">My 2025 Ranking</Link></li>
                <li><Link to="/user/my_ranking/2024">My 2024 Ranking</Link></li>
                <li><Link to="/user/my_ranking/2023">My 2023 Ranking</Link></li>
                <li><Link to="/user/my_ranking/2022">My 2022 Ranking</Link></li>
                <li><Link to="/user/my_ranking/2021">My 2021 Ranking</Link></li>
            </ul>
            <h2> Friends </h2>
            <ul>
                <li><Link to="/friends/my_friends"> My Friends </Link></li>
                <li><Link to="/friends/search"> Search for Friends</Link></li>
            </ul>
        </>
    )
}

export default UserHomePage