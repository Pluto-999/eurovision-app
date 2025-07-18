import { Routes, Route } from "react-router-dom"
import FriendsList from "../pages/FriendsList"
import FriendSearch from "../pages/FriendSearch"
import FriendAdd from "../pages/FriendAdd"

function FriendsRoutes() {
    return (
        <Routes>
            <Route path="/my_friends" element={<FriendsList />}/>
            <Route path="/search/" element={<FriendSearch />} />
        </Routes>
    )
}

export default FriendsRoutes