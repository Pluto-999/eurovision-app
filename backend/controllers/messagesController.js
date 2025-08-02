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
        SELECT content, timestamp
        FROM messages
        WHERE sender=${currentUser} AND receiver=${otherUser}
    `

    const currentUserReceivedMessages = await sql`
        SELECT sender, content, timestamp
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


const sendMessage = asyncWrapper(async (req, res) => {
    
    const currentUser = req.username
    
    const targetUser = await sql`
        SELECT username
        FROM users
        WHERE username=${req.params.username}
    `
    
    if (targetUser.length === 0) {
        return res.status(404).json({ success: false, message: "No user exists with this username" })
    }
    if (currentUser === targetUser[0]["username"]) {
        return res.status(400).json({ success: false, message: "Cannot send a message to yourself" })
    }

    const message = req.body.message

    if (!message || message.length === 0) {
        return res.status(400).json({ success: false, message: "Please ensure you provide a message to send" })
    }

    const newMessage = await sql`
        INSERT INTO messages (sender, receiver, content, timestamp)
        VALUES (${currentUser}, ${targetUser[0]["username"]}, ${message}, ${new Date})
        RETURNING *
    `

    res.status(201).json({ success: true, newMessage: newMessage })


}) 

module.exports = {
    getMessages,
    sendMessage
}