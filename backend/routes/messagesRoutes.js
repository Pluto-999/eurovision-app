const express = require("express")
const router = express.Router()

const {
    getMessages,
    sendMessage
} = require("../controllers/messagesController")

router.get("/:username", getMessages)
router.post("/:username", sendMessage)

module.exports = router