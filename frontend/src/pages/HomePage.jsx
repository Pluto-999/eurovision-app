import { Link } from "react-router-dom"

function HomePage () {
    return (
        <>
            <div> HOME PAGE </div>
            <Link to="/results"> Results Home Page </Link>
        </>
    )
}

export default HomePage