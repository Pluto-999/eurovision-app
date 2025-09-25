import { Link } from "react-router-dom"
import "../styles/Navbar.css"   
import { useUserContext } from "../context/userContext"

function Navbar() {
    
    const { user } = useUserContext()
    
    return (
        <nav className="navbar">
            <ul className="navbar_links">
                <li><Link to="/">Euroscore</Link></li>
                <li>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="account"> Official Results </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link to="/countries"> Participating Countries </Link></li>
                                <li><Link to="/results/all_results"> All Results </Link></li>
                            </ul>
                    </div>
                </li>
                <li><Link to="/user_stats">Community Rankings and Ratings</Link></li>
                <li><Link to="search">Search</Link></li>
                <li>
                    {user ? (
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="account"> 
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.profile_picture} />
                                </div>
                            </div>
                            {user.username}
                        </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link to="/user/home"> Homepage </Link></li>
                                <li><Link to="/user/settings"> Account Settings </Link></li>
                                <li><Link to="/account/logout"> Logout </Link></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="account">Account</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link to="/account/login"> Login </Link></li>
                                <li><Link to="/account/register"> Register </Link></li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
        
    )
}

export default Navbar