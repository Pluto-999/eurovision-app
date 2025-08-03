const express = require("express")
const router = express.Router()

const {
    getMessages
} = require("../controllers/messagesController")

router.get("/:username", getMessages)

module.exports = router