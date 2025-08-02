import { useEffect, useState } from "react"
import socket from "../socket"
import { useParams } from "react-router-dom"
import axios from "axios"

function Chat() {
    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("")
    const params = useParams()
    const [allMessages, setAllMessages] = useState([])

    const sendMessage = () => {
        socket.emit("sendMessage", {
            message: message,
            username: params.username
        })
        axios.post(`http://localhost:3000/api/messages/${params.username}`,
            { message: message },
            { withCredentials: true }
        )
        .then(response => {
            console.log(response)
        })
    }

    // runs any time socket emits something as socket is in dependency list
    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessageReceived(data.message)
        })
    }, [socket])


    useEffect(() => {
        axios.get(`http://localhost:3000/api/messages/${params.username}`,
            { withCredentials: true }
        )
        .then(response => {
            console.log(response)
            setAllMessages(response.data.messages)
        })
    }, [])

    return (
        <>
            <h1> Chat with {params.username} </h1>
            <ul> 
                {
                    allMessages.map((message) => (
                        
                        <li key={message.timestamp} className={message.sender ? "bg-blue-500" : "bg-cyan-500"}>
                            <div> {message.content} </div>
                            <div> {message.timestamp} </div>
                        </li>
                    ))
                } 
            </ul>
            <input placeholder="message" onChange={(event) => {setMessage(event.target.value)}}></input>
            <button onClick={sendMessage}> Send Message </button>
            <h1>Message: { messageReceived }</h1>
        </>
    )
}

export default Chat