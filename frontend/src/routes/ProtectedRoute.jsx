import { useEffect } from "react"
import { useUserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import toast from "react-hot-toast"

function ProtectedRoute({ children }) {
    const { user, loading } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && user === null) {
            navigate("/account", { replace: true })
            toast.error("Sorry, you are unauthorized to access this route. Try logging in again or register for an account if you do not have one.")
        }
    }, [navigate, user, loading])

    if (loading) {
        return (
            <div className="loader">
                <Ring />
            </div>
        )
    }

    return children
}

export default ProtectedRoute