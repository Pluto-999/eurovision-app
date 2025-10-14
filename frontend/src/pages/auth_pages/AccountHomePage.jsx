import { Link } from "react-router-dom"
import "ldrs/react/Ring.css"
import { useUserContext } from "../../context/userContext"
import "../../styles/links.css"

function HomePage () {
    const { user } = useUserContext()

    return (
        <div className="whole_page">
            <h1> Account Home Page </h1>
            { user ? (
                <div className="flex flex-col gap-3">
                    <div> You are already logged in as {user.username}</div>
                    <div><Link to="/user/home" className="text_link"> Go to your dashboard </Link></div>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <div><Link to="/account/register" className="text_link"> Register </Link></div>
                    <div><Link to="/account/login" className="text_link"> Login </Link></div>
                </div>
            )}
            
        </div>
    )
}

export default HomePage