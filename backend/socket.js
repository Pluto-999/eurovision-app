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

const onlineUsers = new Set()

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
        onlineUsers.add(socket.user.username)
        console.log("user connected:", socket.user.username)
    }
    catch (error) {
        console.log(error)
        return socket.disconnect(true)
    }

    // socket.on("sendMessage", (data) => {
    //     console.log(data)
    //     socket.broadcast.emit("receiveMessage", data)
    // })

    io.on("disconnect", () => {
        onlineUsers.delete(socket.user.username)
        console.log("A user disconnected", socket.id)
    })
})

module.exports = { app, server, io }