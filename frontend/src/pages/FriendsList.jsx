import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import FriendDelete from "./FriendDelete"
import { Link } from "react-router-dom"

function FriendsList() {
    const [friendList, setFriendList] = useState([])
    const navigate = useNavigate()

    const fetchFriends = async () => {
        axios.get("http://localhost:3000/api/friends/my_friends",
            { withCredentials: true })
        .then(response => {
            setFriendList(response.data.friends)
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
            navigate("/account")
        })
    }

    useEffect(() => {
        fetchFriends()
    }, [])

    return (
        <>
            {friendList?.length === 0 ? (
                <>
                <h2> You currently have no friends </h2>
                <Link to="/friends/search"> Search for friends </Link>
                </>
            ) : (
            <>
            <h1> My friends </h1>
            <ul>
            {
                friendList.map((friend) => (
                    <li key={friend}>
                        {friend}
                        <FriendDelete username={friend} fetchFriends={fetchFriends}/>
                    </li>
                ))
            }
            </ul>
            </>
            )}
        </>
            
    )
}

export default FriendsList