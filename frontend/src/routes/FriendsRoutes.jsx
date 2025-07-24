import { Routes, Route } from "react-router-dom"
import FriendsList from "../pages/FriendsList"
import FriendSearch from "../pages/FriendSearch"
import FriendAdd from "../pages/FriendAdd"
import FriendRankingHomepage from "../pages/FriendRankingHomepage"
import OtherUserRanking from "../pages/OtherUserRanking"

function FriendsRoutes() {
    return (
        <Routes>
            <Route path="/my_friends" element={<FriendsList />}/>
            <Route path="/search/" element={<FriendSearch />} />
            <Route path="/:username" element={<FriendRankingHomepage />} />
            <Route path="/:username/ranking/:year" element={<OtherUserRanking />} />
        </Routes>
    )
}

export default FriendsRoutes