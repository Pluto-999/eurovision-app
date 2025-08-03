const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const { io } = require("../socket")

const getMessages = asyncWrapper(async (req, res) => {
    const currentUser = req.username
    const otherUser = req.params.username

    if (currentUser === otherUser) {
        return res.status(404).json({ success: false, message: "Cannot get messages sent to yourself" })
    }

    const currentUserSentMessages = await sql`
        SELECT *
        FROM messages
        WHERE sender=${currentUser} AND receiver=${otherUser}
    `

    const currentUserReceivedMessages = await sql`
        SELECT *
        FROM messages
        WHERE sender=${otherUser} AND receiver=${currentUser}
    `

    const allMessages = currentUserSentMessages.concat(currentUserReceivedMessages)

    allMessages.sort((a, b) => a.timestamp - b.timestamp)

    res.status(200).json({ 
        success: true, 
        messages: allMessages 
    })
})

module.exports = {
    getMessages
}