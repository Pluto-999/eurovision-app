import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function FriendsList() {
    const [friendList, setFriendList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
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
    }, [])

    return (
        <>
            <h1> My friends </h1>
            {
                friendList.map(friend => (
                    <ul key={friend}>
                        <li>{friend}</li>
                    </ul>
                ))
            }
        </>
    )
}

export default FriendsList