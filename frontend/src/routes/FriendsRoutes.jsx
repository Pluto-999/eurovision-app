import { Routes, Route } from "react-router-dom"
import FriendsList from "../pages/friends_pages/FriendsList"
import FriendSearch from "../pages/friends_pages/FriendSearch"
import FriendRankingHomepage from "../pages/friends_pages/FriendRankingHomepage"
import OtherUserRanking from "../pages/friends_pages/OtherUserRanking"

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