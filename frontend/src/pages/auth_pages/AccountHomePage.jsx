import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"

function HomePage () {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:3000/api/user/home",
                { withCredentials: true })
        .then(response => {
            setUser(response.data.user)
        })
        .catch(error => {
            console.log(error)
            if (error.response.status !== 401 && error.response.data.message) {
                toast(error.response.data.message)
            }
            navigate("/account")
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
        {
        loading ? (
            <Ring />
        ) : 
        user ? (navigate("/user/home")) : ( 
            <div className="whole_page">
            <h1> Account Home Page </h1>
            <div className="flex flex-col gap-3">
                <div><Link to="/account/register"> Register </Link></div>
                <div><Link to="/account/login"> Login </Link></div>
            </div>
            </div>
        )}
        </>
    )
}

export default HomePage