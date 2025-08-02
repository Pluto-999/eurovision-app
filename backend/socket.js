const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cookie = require("cookie")
const cookieParser = require("cookie-parser")
const { verifyToken } = require("./utils/jwt")

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

    socket.on("sendMessage", (data) => {
        const targetSocketId = onlineUsers[data.username]
        io.to(targetSocketId).emit("receiveMessage", data)
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.username)
        onlineUsers.delete(socket.user.username)
        
    })
})

module.exports = { app, server, io }