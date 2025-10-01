const express = require("express")
const router = express.Router()

const {
    searchForFriends,
    getFriends,
    createFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendRequests,
    deleteFriend
} = require("../controllers/friendsController")

router.get("/search/:username", searchForFriends)
router.get("/my_friends", getFriends)
router.post("/create_friend_request", createFriendRequest)
router.patch("/accept_friend_request", acceptFriendRequest)
router.patch("/reject_friend_request", rejectFriendRequest)
router.get("/my_friend_requests", getFriendRequests)
router.delete("/delete/:username", deleteFriend)

module.exports = router