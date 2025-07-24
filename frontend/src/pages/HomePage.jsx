import { Link } from "react-router-dom"

function HomePage () {
    return (
        <>
            <div> HOME PAGE </div>
            <Link to="/countries"> Participating Countries </Link>
            <Link to="/results"> Results Home Page </Link>
            <Link to="/user_stats"> User Rankings and Ratings </Link>
            <Link to="/account"> Account Page</Link>
        </>
    )
}

export default HomePage