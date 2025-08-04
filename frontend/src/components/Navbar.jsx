import { Link } from "react-router-dom"
import "../styles/Navbar.css"   

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar_links">
                <li> <Link to="/">Euroscore</Link></li>
                <li> <Link to="/countries">Countries Homepage</Link></li>
                <li> <Link to="/results">Results Home Page</Link></li>
                <li> <Link to="/user_stats">Community Rankings and Ratings</Link></li>
                <li> <Link to="/account">My Account</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar