import api from "../../utils/axios"
import { useEffect, useState } from "react"
import "../../styles/friends.css"
import AcceptFriendRequest from "./AcceptFriendRequest"
import RejectFriendRequest from "./RejectFriendRequest"
import DeleteFriendRequest from "./DeleteFriendRequest"
import Pagination from "../../components/Pagination"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"

function FriendRequestsHomePage() {
    const [incomingRequests, setIncomingRequests] = useState([])
    const [outgoingRequests, setOutgoingRequests] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await api.get("/friends/my_friend_requests")
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
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="whole_page">
            
            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
                <>
                <h1> View my friend requests </h1>

                <div className="flex flex-row p-2 gap-10">
                    <div>
                        <h2> Incoming Friend Requests </h2>
                        {
                            incomingRequests.length > 0 ? (
                                <Pagination 
                                    data={incomingRequests}
                                    itemsPerPage={10}
                                    renderDataItem={(request) => (
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
                                    )}
                                />
                            ) : (
                                <div> You currently have no incoming friend requests </div>
                            )
                        }
                    </div>
                    <div>
                        <h2> Outgoing Friend Requests </h2>
                        {
                            outgoingRequests.length > 0 ? (
                                <Pagination 
                                    data={outgoingRequests}
                                    itemsPerPage={10}
                                    renderDataItem={(request) => (
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
                                    )}
                                />
                            ) : (
                                <div> You currently have no outgoing friend requests </div>
                            )
                        }
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default FriendRequestsHomePage