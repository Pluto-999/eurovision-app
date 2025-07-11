import { Link } from "react-router-dom"

function HomePage () {
    return (
        <>
            <div> HOME PAGE </div>
            <Link to="/results"> Results Home Page </Link>
            <Link to="/account"> Account Page</Link>
        </>
    )
}

export default HomePage