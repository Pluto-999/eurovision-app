import { Link } from "react-router-dom"
import "../../styles/links.css"

function UserSettingsPage() {

    return (
        <div className="whole_page">
            <h1> Account Settings </h1>
            <div className="flex flex-col gap-2.5">
                <div><Link to="/user/change_profile_picture" className="text_link"> Change Profile Picture </Link></div>
                <div><Link to="/user/change_username" className="text_link"> Change Username </Link></div>
            </div>
        </div>
    )
}

export default UserSettingsPage