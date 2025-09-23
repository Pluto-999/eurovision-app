import { Link } from "react-router-dom"

function UserSettingsPage() {

    return (
        <>
        <h1> Account Settings </h1>
        <div> 
            <Link to="/user/change_profile_picture"> Change Profile Picture </Link>
        </div>
        </>
    )
}

export default UserSettingsPage