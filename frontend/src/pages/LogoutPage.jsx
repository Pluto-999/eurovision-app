import axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function LogoutPage() {
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/logout",
            { withCredentials: true }
        )
        .then(response => {
            const message = response.data.message
            toast(message)
            navigate("/account")
        }, [])
    })

    return (
        <></>
    )
}

export default LogoutPage