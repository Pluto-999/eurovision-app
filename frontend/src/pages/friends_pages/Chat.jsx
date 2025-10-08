import { useEffect, useState, useRef } from "react"
import socket from "../../socket"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { IoSend } from "react-icons/io5"
import "../../styles/chat.css"
import toast from "react-hot-toast"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import { useUserContext } from "../../context/userContext"

function Chat() {
    const [message, setMessage] = useState("")
    const params = useParams()
    const [allMessages, setAllMessages] = useState([])
    const [userDetails, setUserDetails] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const { user } = useUserContext()

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }, [allMessages])

    const sendMessage = () => {
        socket.emit("sendMessage", {
            message: message,
            username: params.username
        })
        setMessage("")
    }

    const fetchMessages = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:3000/api/messages/${params.username}`, 
                { withCredentials: true }
            )
            console.log(response)
            setAllMessages(response.data.messages)
            setUserDetails(response.data.otherUserDetails)
        } 
        catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something went wrong, please try again")
            }
            navigate("/user/home")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages()

        const handleReceiveMessage = (data) => {
            setAllMessages(prev => [...prev, data])
        }

        socket.on("receiveMessage", handleReceiveMessage)

        return () => {
            socket.off("receiveMessage", handleReceiveMessage)
        }
    }, [])

    return (
        <div className="chat_page">
            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
                <>
                    <h1 className="chat_header"> 
                        <div className="avatar">
                            <div className="w-15 rounded-full">
                                <img src={userDetails.profile_picture} />
                            </div>
                        </div>
                        {userDetails.username} 
                    </h1>
                
                    <div className="min-h-[70vh]"> 
                        {
                            allMessages.map((message) => (
                                
                                <div 
                                    key={message.message_id}
                                    className={`chat ${message.sender === params.username ? "chat-start" : "chat-end"}`}
                                >
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img 
                                                src={message.sender === params.username ? 
                                                    userDetails.profile_picture : 
                                                    user.profile_picture
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {message.sender === params.username ? userDetails.username : user.username}
                                    </div>
                                    <div className="chat-bubble"> {message.content} </div>
                                    
                                    <div className="chat-footer"> 
                                        {new Date(message.timestamp).toLocaleString("en-GB", {
                                            dateStyle: "short",
                                            timeStyle: "short"
                                        })} 
                                    </div>
                                </div>
                                
                            ))
                        }
                        <div ref={messagesEndRef}/>
                    </div>

                    <div className="message_bar">
                        <input 
                            placeholder="Message"
                            type="text"
                            value={message}
                            onChange={(event) => {setMessage(event.target.value)}}
                            className="input w-8/10"
                        ></input>
                        <button className="btn w-1/10" onClick={sendMessage}> <IoSend /> </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Chat