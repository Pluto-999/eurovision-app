import io from "socket.io-client"

const socket = io(import.meta.env.MODE === "development" ? "http://localhost:3000" : "/", {
    autoConnect: false,
    withCredentials: true
})

export default socket