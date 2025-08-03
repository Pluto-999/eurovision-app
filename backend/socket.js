const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cookie = require("cookie")
const cookieParser = require("cookie-parser")
const { verifyToken } = require("./utils/jwt")
const sql = require("./config/db")

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

const onlineUsers = new Map()

// socket refers to user that has just connected
io.on("connection", (socket) => {
    const rawCookie = socket.handshake.headers.cookie

    if (!rawCookie) {
        console.log("no cookie present")
        return socket.disconnect(true)
    }

    const parsedCookie = cookie.parse(rawCookie) // e.g. { token: '*encoded username*'}

    const signedToken = parsedCookie.token
    const unsignedToken = cookieParser.signedCookie(signedToken, process.env.JWT_SECRET_KEY)

    if (!unsignedToken) {
        console.log("invalid signature")
        return socket.disconnect(true)
    }

    try {
        const payload = verifyToken(unsignedToken)
        socket.user = payload
        onlineUsers[socket.user.username] = socket.id
        console.log("user connected:", socket.user.username)
    }
    catch (error) {
        console.log(error)
        return socket.disconnect(true)
    }

    socket.on("sendMessage", async (data) => {
        const message = data.message
        const targetUser = data.username
        const currentUser = socket.user.username

        if (!message || message.length === 0 || !targetUser || targetUser === currentUser) {
            return
        }

        try {
            const newMessage = await sql`
                INSERT INTO messages (sender, receiver, content, timestamp)
                VALUES (${currentUser}, ${targetUser}, ${message}, ${new Date})
                RETURNING *
            `

            const payload = {
                sender: currentUser,
                receiver: targetUser,
                content: newMessage[0].content,
                timestamp: newMessage[0].timestamp
            }

            const targetSocketId = onlineUsers[targetUser]
            io.to(targetSocketId).emit("receiveMessage", payload)

            socket.emit("receiveMessage", payload)
        }
        catch (error) {
            console.log(error)
            socket.emit("error", { message: "There was an error trying to send your message." })
        }
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.username)
        onlineUsers.delete(socket.user.username)
        
    })
})

module.exports = { app, server, io }