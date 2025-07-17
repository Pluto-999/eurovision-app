import { useEffect, useState } from "react"
import socket from "../socket"

function Chat() {
    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("")

    const sendMessage = () => {
        socket.emit("sendMessage", {
            message: message
        })
    }

    // runs any time socket emits something as socket is in dependency list
    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessageReceived(data.message)
        })
    }, [socket])

    return (
        <>
            <input placeholder="message" onChange={(event) => {setMessage(event.target.value)}}></input>
            <button onClick={sendMessage}> Send Message </button>
            <h1>Message: { messageReceived }</h1>
        </>
    )
}

export default Chat