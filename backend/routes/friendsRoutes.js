const express = require("express")
const router = express.Router()

const {
    searchForFriends,
    getFriends,
    addFriend,
    deleteFriend
} = require("../controllers/friendsController")

router.get("/search/:username", searchForFriends)
router.get("/my_friends", getFriends)
router.post("/add", addFriend)
router.delete("/delete/:username", deleteFriend)

module.exports = router