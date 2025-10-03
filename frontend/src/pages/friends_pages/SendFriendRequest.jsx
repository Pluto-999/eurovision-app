import axios from "axios"
import toast from "react-hot-toast"
import { IoPersonAdd } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

function SendFriendRequest({ username }) {
    const navigate = useNavigate()

    const sendFriendRequest = async () => {
        try {
            await axios.post("http://localhost:3000/api/friends/create_friend_request", 
                { username },
                { withCredentials: true }
            )

            toast.success(`Successfully sent a friend request to ${username}`)
        } 
        catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something has gone wrong, please try again")
            }
            if (error.response.status === 401) {
                navigate("/account")
            }
        }
    }

    return (
        <>
            <button className="btn btn-soft btn-success" onClick={sendFriendRequest}> 
                <IoPersonAdd />
                Send Friend Request
            </button>
        </>
    )
}

export default SendFriendRequest