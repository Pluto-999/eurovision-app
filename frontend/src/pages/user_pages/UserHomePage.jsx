import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"

function UserHomePage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:3000/api/user/home",
                { withCredentials: true })
        .then(response => {
            setUser(response.data.user)
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something has gone wrong, please try again")
            }
            navigate("/account")
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="whole_page">
            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
               <>
               <h1> Welcome {user ? user.username : ""} </h1>
                <h2> My Rankings </h2>
                <div className="flex flex-col gap-2.5">
                    <div><Link to="/user/my_ranking/2025">My 2025 Ranking</Link></div>
                    <div><Link to="/user/my_ranking/2024">My 2024 Ranking</Link></div>
                    <div><Link to="/user/my_ranking/2023">My 2023 Ranking</Link></div>
                    <div><Link to="/user/my_ranking/2022">My 2022 Ranking</Link></div>
                    <div><Link to="/user/my_ranking/2021">My 2021 Ranking</Link></div>
                </div>
                <h2> Friends </h2>
                <div className="flex flex-col gap-2.5">
                    <div><Link to="/friends/my_friends"> My Friends </Link></div>
                    <div><Link to="/friends/search"> Search for Friends</Link></div>
                </div>
               </> 
            )}
            
        </div>
    )
}

export default UserHomePage