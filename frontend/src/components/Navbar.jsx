import { Link } from "react-router-dom"
import "../styles/Navbar.css"   

function Navbar() {
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
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="account">Account</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link to="/account">Profile</Link></li>
                                <li><Link to="/account/logout"> Logout </Link></li>
                            </ul>
                    </div>
                </li>
            </ul>
        </nav>

        
    )
}

export default Navbar