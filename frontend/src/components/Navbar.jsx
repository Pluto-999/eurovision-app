import { Link } from "react-router-dom"
import "../styles/Navbar.css"
import { useUserContext } from "../context/userContext"
import { IoIosMenu } from "react-icons/io"
import { IoSettings } from "react-icons/io5"
import { IoHome } from "react-icons/io5"
import { FiLogOut } from "react-icons/fi"
import { FiLogIn } from "react-icons/fi"
import { IoCreate } from "react-icons/io5"

function Navbar() {
    
    const { user } = useUserContext()
    
    const contents = (
        <>
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
                        <li><Link to="/user/home"> <IoHome /> Homepage </Link></li>
                        <li><Link to="/user/settings"> <IoSettings /> Account Settings </Link></li>
                        <li><Link to="/account/logout"> <FiLogOut /> Logout </Link></li>
                    </ul>
                </div>
            ) : (
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="nav_dropdown">Account</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><Link to="/account/login"> <FiLogIn /> Login </Link></li>
                        <li><Link to="/account/register"> <IoCreate /> Register </Link></li>
                    </ul>
                </div>
            )}
        </li>
        </>
    )

    return (
        <nav className="navbar">
            <div className="navbar_title">
                <Link to="/">Euroscore</Link>
            </div>
            <ul className="navbar_links">
                { contents }
            </ul>

            <div className="hamburger">
                <div className="drawer">
                    <input id="drawer-1" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="drawer-1" className="drawer-button cursor-pointer"> <IoIosMenu size={50}/> </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 min-h-full w-80 p-4">
                            { contents }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        
    )
}

export default Navbar