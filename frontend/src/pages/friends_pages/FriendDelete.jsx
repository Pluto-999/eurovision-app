import axios from "axios"
import toast from "react-hot-toast"
import { IoPersonRemove } from "react-icons/io5"

function FriendDelete({ username, fetchFriends }) {

    const DeleteFriend = async () => {
        axios.delete(`http://localhost:3000/api/friends/delete/${username}`, 
            { withCredentials: true })
        .then(() => {
            toast.success("Friend successfully deleted")
            fetchFriends()
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast.error("Something has gone wrong, please try again")
            }
            if (error.response.status === 401) {
                navigate("/account")
            } 
        })
    }

    return (
        <>
            <button className="btn btn-soft btn-error" onClick={DeleteFriend}> 
                <IoPersonRemove />
                Delete friend 
            </button>
        </>
    )
}

export default FriendDelete