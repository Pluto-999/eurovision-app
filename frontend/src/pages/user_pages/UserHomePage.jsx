import { Link } from "react-router-dom"
import "ldrs/react/Ring.css"
import { useUserContext } from "../../context/userContext"
import "../../styles/links.css"
import { FaRankingStar } from "react-icons/fa6"
import { FaUserFriends } from "react-icons/fa"
import { IoSettings } from "react-icons/io5"
import { FiLogOut } from "react-icons/fi"
import { PiHandWaving } from "react-icons/pi"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"

function UserHomePage() {
    const { user, loading } = useUserContext()
    
    if (loading) {
        return (
            <div className="loader">
                <Ring />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5 items-center">
            <h1 className="flex items-center gap-3"> 
                <PiHandWaving /> 
                Welcome {user.username}
            </h1>
            
            <div className="flex gap-10">
                <div>
                    <h2 className="flex items-center gap-3"> <FaRankingStar /> My Rankings </h2>
                    <div className="flex flex-col gap-2.5">
                        <div><Link to="/user/my_ranking/2025" className="text_link">My 2025 Ranking</Link></div>
                        <div><Link to="/user/my_ranking/2024" className="text_link">My 2024 Ranking</Link></div>
                        <div><Link to="/user/my_ranking/2023" className="text_link">My 2023 Ranking</Link></div>
                        <div><Link to="/user/my_ranking/2022" className="text_link">My 2022 Ranking</Link></div>
                        <div><Link to="/user/my_ranking/2021" className="text_link">My 2021 Ranking</Link></div>
                    </div>
                </div>
                <div>
                    <h2 className="flex items-center gap-3"> <FaUserFriends /> Friends </h2>
                    <div className="flex flex-col gap-2.5">
                        <div><Link to="/friends/my_friends" className="text_link"> My Friends </Link></div>
                        <div><Link to="/friends/requests" className="text_link"> My Friend Requests </Link></div>
                        <div><Link to="/friends/search" className="text_link"> Search for Friends </Link></div>
                    </div>
                </div>
                <div>
                    <h2 className="flex items-center gap-2"> <IoSettings /> Settings </h2>
                    <div className="flex flex-col gap-2.5">
                        <div><Link to="/user/change_profile_picture" className="text_link"> Change Profile Picture </Link></div>
                        <div><Link to="/user/change_username" className="text_link"> Change Username </Link></div>
                    </div>
                </div>
            </div>
            <div>
                <Link to="/account/logout" className="flex items-center gap-3 text_link"> <FiLogOut /> Logout </Link>
            </div>
        </div>
    )
}

export default UserHomePage