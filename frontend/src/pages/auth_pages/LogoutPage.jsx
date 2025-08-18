import axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import socket from "../../socket"

function LogoutPage() {
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/logout",
            { withCredentials: true }
        )
        .then(response => {
            const message = response.data.message
            toast(message)

            if (socket.connected) {
                socket.disconnect()
            }

            navigate("/account")
        })
        .catch(error => {
            if (error.status === 401) {
                toast("You are already logged out")
                navigate("/account")
            }
            else {
                toast("Sorry, something went wrong. Please try again later")
            }
        })
    }, [])

    return (
        <></>
    )
}

export default LogoutPage