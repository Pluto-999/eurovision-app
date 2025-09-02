import { useEffect, useState } from "react"
import socket from "../../socket"
import { useParams } from "react-router-dom"
import axios from "axios"

function Chat() {
    const [message, setMessage] = useState("")
    const params = useParams()
    const [allMessages, setAllMessages] = useState([])

    const sendMessage = () => {
        socket.emit("sendMessage", {
            message: message,
            username: params.username
        })
        setMessage("")
    }

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setAllMessages(prev => [...prev, data])
        }

        socket.on("receiveMessage", handleReceiveMessage)

        return () => {
            socket.off("receiveMessage", handleReceiveMessage)
        }
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/messages/${params.username}`,
            { withCredentials: true }
        )
        .then(response => {
            setAllMessages(response.data.messages)
        })
    }, [])

    return (
        <>
            <h1> Chat with {params.username} </h1>
            
            <ul> 
                {
                    allMessages.map((message) => (
                        
                        <li 
                            key={message.message_id} 
                            className={`chat ${message.sender === params.username ? "chat-start" : "chat-end"}`}
                        >
                            <div className="chat-bubble"> {message.content} </div>
                            
                            <div className="chat-footer"> 
                                {new Date(message.timestamp).toLocaleString("en-GB", {
                                    dateStyle: "short",
                                    timeStyle: "short"
                                })} 
                            </div>
                        </li>
                        
                    ))
                } 
            </ul>
            <input 
                placeholder="message" 
                value={message}
                onChange={(event) => {setMessage(event.target.value)}}
            ></input>
            <button onClick={sendMessage}> Send Message </button>
        </>
    )
}

export default Chat