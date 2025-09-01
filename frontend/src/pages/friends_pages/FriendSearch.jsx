import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import FriendAdd from "./FriendAdd"

function FriendSearch () {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSearchResults([])

        axios.get(`http://localhost:3000/api/friends/search/${search}`,
            { withCredentials: true }
        )
        .then(response => setSearchResults(response.data.users))
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
            if (error.response.status === 401) {
                navigate("/account")
            }
        })
    }

    return (
        <>
            <h1> Search for friends </h1>

            <form onSubmit={handleSubmit} className="p-2 flex gap-4">
                <input
                    type="text"
                    required={true}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter a username to start your search"
                >    
                </input>

                <button><input type="submit" value="Search"></input></button>
            </form>

            {
                searchResults.map(friend => (
                    <ul key={friend.username}>
                        <li className="p-2 flex items-center gap-4">
                            {friend.username} 
                            <FriendAdd username={friend.username}/> 
                        </li>
                    </ul>
                ))
                
            } 
        </>
    )
}

export default FriendSearch