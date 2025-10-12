import api from "../../utils/axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import socket from "../../socket"
import { useUserContext } from "../../context/userContext"

function LogoutPage() {
    const navigate = useNavigate()
    const { setUser } = useUserContext()

    useEffect(() => {
        api.get("/auth/logout")
        .then(response => {
            const message = response.data.message
            toast(message)
            setUser(null)

            if (socket.connected) {
                socket.disconnect()
            }
            navigate("/")
        })
        .catch(error => {
            if (error.status === 401) {
                toast("You are already logged out")
                navigate("/")
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