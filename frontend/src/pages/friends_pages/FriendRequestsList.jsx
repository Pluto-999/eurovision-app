import axios from "axios"
import { useEffect, useState } from "react"
import "../../styles/friends.css"
import AcceptFriendRequest from "./AcceptFriendRequest"
import RejectFriendRequest from "./RejectFriendRequest"
import DeleteFriendRequest from "./DeleteFriendRequest"

function FriendRequestsHomePage() {
    const [incomingRequests, setIncomingRequests] = useState([])
    const [outgoingRequests, setOutgoingRequests] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/friends/my_friend_requests", 
                { withCredentials: true }
            )
            setIncomingRequests(response.data.incomingRequests)
            setOutgoingRequests(response.data.outgoingRequests)
        }
        catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something went wrong, please try again")
            }
        }
    }

    useEffect(() => {

        fetchData()
    }, [])


    return (
        <div className="whole_page">
            <h1> View my friend requests </h1>

            <div className="flex flex-row p-2 gap-10">
                <div>
                    <h2> Incoming Friend Requests </h2>
                    {
                        incomingRequests.length > 0 ? (
                            <>
                            {
                                incomingRequests.map(request => (
                                    <div className="friend_card">
                                        <div className="flex gap-3 items-center">
                                            <div className="avatar">
                                                <div className="w-10 rounded-full">
                                                    <img src={request.profile_picture} />
                                                </div>
                                            </div>
                                            {request.username}
                                        </div>
                                        <div className="flex gap-5"> 
                                            <AcceptFriendRequest 
                                                username={request.username} 
                                                onAccepted={() => {
                                                    setIncomingRequests(prev => prev.filter(user => user.username !== request.username))
                                                }}
                                            />
                                            <RejectFriendRequest 
                                                username={request.username} 
                                                onAccepted={() => {
                                                    setIncomingRequests(prev => prev.filter(user => user.username !== request.username))
                                                }}    
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            </>
                        ) : (
                            <div> You currently have no incoming friend requests </div>
                        )
                    }
                </div>
                <div>
                    <h2> Outgoing Friend Requests </h2>
                    {
                        outgoingRequests.length > 0 ? (
                            <>
                            {
                                outgoingRequests.map(request => (
                                    <div className="friend_card">
                                        <div className="flex gap-3 items-center">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={request.profile_picture} />
                                            </div>
                                        </div>
                                        {request.username}
                                    </div>
                                        <div className="flex">
                                            <DeleteFriendRequest 
                                                username={request.username} 
                                                onAccepted={() => {
                                                    setOutgoingRequests(prev => prev.filter(user => user.username !== request.username))
                                                }}    
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            </>
                        ) : (
                            <div> You currently have no outgoing friend requests </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FriendRequestsHomePage