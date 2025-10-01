import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import FriendDelete from "./FriendDelete"
import { Link } from "react-router-dom"
import { IoChatboxEllipses } from "react-icons/io5"
import { FaRankingStar } from "react-icons/fa6"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import Pagination from "../../components/Pagination"
import { FaSearch } from "react-icons/fa"
import { useFriendsListContext } from "../../context/friendsListContext"
import "../../styles/friends.css"

function FriendsList() {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const { friendsList, setFriendsList } = useFriendsListContext()
    const navigate = useNavigate()

    const filteredFriends = friendsList.filter(friend =>
        friend.username.toLowerCase().startsWith(search.toLowerCase())
    )
    
    const fetchFriends = async () => {
        setLoading(true)
        axios.get("http://localhost:3000/api/friends/my_friends",
            { withCredentials: true })
        .then(response => {
            setFriendsList(response.data.friends)
        })
        .catch(error => {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something has gone wrong, please try again")
            }
            navigate("/account")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchFriends()
    }, [])

    return (
        <div className="whole_page">
            {
                loading ? (
                    <div className="loader">
                        <Ring />
                    </div>
                ) : (
                    <>
                    {friendsList?.length === 0 ? (
                        <>
                        <h2> You currently have no friends </h2>
                        <div>
                            <Link to="/friends/search"> Search for friends </Link>
                        </div>
                        </>
                    ) : (
                        <>
                        {/* Header and Search Box */}
                        <div className="flex gap-5 items-center">
                            <h1> My friends </h1>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1">
                                    <FaSearch />
                                    Search 
                                </div>
                                <div
                                    tabIndex={0}
                                    className="dropdown-content rounded-box bg-base-100 z-1 w-55 shadow-md p-3"
                                >
                                    <fieldset className="fieldset">
                                            <legend className="fieldset-legend"> Username </legend>
                                            <input 
                                                type="text"
                                                className="input"
                                                placeholder="Search for a friend"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </fieldset>
                                </div>
                            </div>
                        </div>
                        
                        {filteredFriends.length > 0 ? (
                            <Pagination 
                                data={filteredFriends}
                                itemsPerPage={10}
                                renderDataItem={(friend) => (
                                    <div className="friend_card">
                                        <div className="flex gap-3 items-center">
                                            <div className="avatar">
                                                <div className="w-10 rounded-full">
                                                    <img src={friend.profile_picture} />
                                                </div>
                                            </div>
                                            {friend.username}
                                        </div>
                                        <div className="flex gap-5">
                                        <Link to={`/friends/${friend.username}`}>
                                            <button className="btn">
                                                <FaRankingStar />
                                                Rankings
                                            </button>
                                        </Link>
                                        <Link to={`/chat/${friend.username}`}> 
                                            <button className="btn">
                                                <IoChatboxEllipses />
                                                Chat 
                                            </button>
                                        </Link>
                                        <FriendDelete username={friend.username} />
                                        </div>
                                    </div>
                                )}
                            />
                        ) : (
                            <div> No Results </div>
                        )}
                        </>
                    )}
                    </>
                )
            }
        </div>
    )
}

export default FriendsList