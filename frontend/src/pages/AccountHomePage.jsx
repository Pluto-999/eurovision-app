import { Link } from "react-router-dom"

function HomePage () {
    return (
        <>
            <div> ACCOUNT HOME PAGE </div>
            <Link to="/account/register"> Register</Link>
            <Link to="/account/login"> Login</Link>
        </>
    )
}

export default HomePage