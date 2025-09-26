import axios from "axios"
import toast from "react-hot-toast"
import { IoPersonRemove } from "react-icons/io5"
import { useFriendsListContext } from "../../context/friendsListContext"

function FriendDelete({ username }) {

    const { setFriendsList } = useFriendsListContext()

    const DeleteFriend = async () => {
        axios.delete(`http://localhost:3000/api/friends/delete/${username}`, 
            { withCredentials: true })
        .then((response) => {
            toast.success("Friend successfully deleted")
            setFriendsList(prev =>
                prev.filter(friend => friend.username !== response.data.deleted)
            )
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