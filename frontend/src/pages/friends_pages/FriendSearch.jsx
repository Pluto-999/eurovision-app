import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import FriendAdd from "./FriendAdd"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import Pagination from "../../components/Pagination"
import { useFriendsListContext } from "../../context/friendsListContext"
import "../../styles/friends.css"

function FriendSearch () {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const { friendsList } = useFriendsListContext()
    const [loading, setLoading] = useState(false)
    const [madeSearch, setMadeSearch] = useState(false)
    const navigate = useNavigate()

    const filteredUsers = searchResults.filter(
        user => !friendsList.some(friend => friend.username === user.username)
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        axios.get(`http://localhost:3000/api/friends/search/${search}`,
            { withCredentials: true }
        )
        .then(response => {
            if (response.data.success) {
                setSearchResults(response.data.users)
                setMadeSearch(true)
            }
            else {
                toast.error("Something went wrong, please try again")
                setMadeSearch(false)
            }
        })
        .catch(error => {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something went wrong, please try again")
            }
            if (error.response.status === 401) {
                navigate("/account")
            }
            setMadeSearch(false)
            setSearchResults([])
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="whole_page">
            <h1> Search for friends </h1>

            <form onSubmit={handleSubmit} className="w-96">
                
                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Username </legend>
                    <input 
                        type="text"
                        className="input"
                        placeholder="Search for a username"
                        onChange={(e) => setSearch(e.target.value)}
                        required={true}
                    />
                </fieldset>
                
                <input type="submit" value="Search" className="btn"></input>
            </form>

            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
                <>
                    {filteredUsers.length > 0 ? (
                        <Pagination 
                            data={filteredUsers}
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
                                    <FriendAdd username={friend.username}/> 
                                </div>
                            )}
                        />
                    ) : (
                        madeSearch ? 
                            <div> No results, please try a different username </div>
                        : 
                            <></>
                    )}
                </>
            )}

            
        </div>
    )
}

export default FriendSearch