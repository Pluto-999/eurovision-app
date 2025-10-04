import { Link } from "react-router-dom"
import "ldrs/react/Ring.css"
import { useUserContext } from "../../context/userContext"

function HomePage () {
    const { user } = useUserContext()

    return (
        <div className="whole_page">
            <h1> Account Home Page </h1>
            { user ? (
                <div className="flex flex-col gap-3">
                    <div> You are already logged in as {user.username}</div>
                    <div><Link to="/user/home"> Go to your dashboard </Link></div>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <div><Link to="/account/register"> Register </Link></div>
                    <div><Link to="/account/login"> Login </Link></div>
                </div>
            )}
            
        </div>
    )
}

export default HomePage