import { Link } from "react-router-dom"
import "ldrs/react/Ring.css"
import { useUserContext } from "../../context/userContext"
import "../../styles/links.css"

function UserHomePage() {
    const { user } = useUserContext()
    
    return (
        <div className="whole_page">
            <h1> Welcome {user ? user.username : ""} </h1>
            <h2> My Rankings </h2>
            <div className="flex flex-col gap-2.5">
                <div><Link to="/user/my_ranking/2025" className="text_link">My 2025 Ranking</Link></div>
                <div><Link to="/user/my_ranking/2024" className="text_link">My 2024 Ranking</Link></div>
                <div><Link to="/user/my_ranking/2023" className="text_link">My 2023 Ranking</Link></div>
                <div><Link to="/user/my_ranking/2022" className="text_link">My 2022 Ranking</Link></div>
                <div><Link to="/user/my_ranking/2021" className="text_link">My 2021 Ranking</Link></div>
            </div>
            <h2> Friends </h2>
            <div className="flex flex-col gap-2.5">
                <div><Link to="/friends/my_friends" className="text_link"> My Friends </Link></div>
                <div><Link to="/friends/requests" className="text_link"> My Friend Requests </Link></div>
                <div><Link to="/friends/search" className="text_link"> Search for Friends </Link></div>
            </div>
        </div>
    )
}

export default UserHomePage