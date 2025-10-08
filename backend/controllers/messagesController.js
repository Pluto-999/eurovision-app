const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")

const getMessages = asyncWrapper(async (req, res) => {
    const currentUser = req.username
    const otherUser = req.params.username

    if (currentUser === otherUser) {
        return res.status(404).json({ success: false, message: "Cannot get messages sent to yourself" })
    }

    const otherUserDetails = await sql`
        SELECT username, profile_picture
        FROM friends INNER JOIN users
        ON (friends.user1=${currentUser} AND users.username=friends.user2)
        OR (friends.user2=${currentUser} AND users.username=friends.user1)
        WHERE users.username=${otherUser}
    `

    if (otherUserDetails.length === 0) {
        return res.status(404).json({ success: false, message: `You cannot chat with ${otherUser}, as they either don't exist, or you aren't currently friends with them` })
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
        messages: allMessages,
        otherUserDetails: otherUserDetails[0]
    })
})

module.exports = {
    getMessages
}