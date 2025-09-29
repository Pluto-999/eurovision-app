import { Link } from "react-router-dom"
import "../styles/Navbar.css"
import { useUserContext } from "../context/userContext"
import { IoIosMenu } from "react-icons/io"

function Navbar() {
    
    const { user } = useUserContext()
    
    return (
        <nav className="navbar">
            <div className="navbar_title">
                <Link to="/">Euroscore</Link>
            </div>
            <ul className="navbar_links">
                <li>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="nav_dropdown"> Official Results </div>
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
                        <div tabIndex={0} role="button" className="nav_dropdown account"> 
                            <div className="avatar">
                                <div className="w-7 rounded-full">
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
                        <div tabIndex={0} role="button" className="nav_dropdown">Account</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link to="/account/login"> Login </Link></li>
                                <li><Link to="/account/register"> Register </Link></li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>

            <div className="hamburger">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button"><IoIosMenu size={50}/></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="nav_dropdown"> Official Results </div>
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
                                <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="nav_dropdown account"> 
                                    <div className="avatar">
                                        <div className="w-7 rounded-full">
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
                                <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="nav_dropdown">Account</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li><Link to="/account/login"> Login </Link></li>
                                        <li><Link to="/account/register"> Register </Link></li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
        
    )
}

export default Navbar