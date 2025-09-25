import { Link } from "react-router-dom"

function UserSettingsPage() {

    return (
        <div className="whole_page">
            <h1> Account Settings </h1>
            <div> 
                <Link to="/user/change_profile_picture"> Change Profile Picture </Link>
            </div>
        </div>
    )
}

export default UserSettingsPage