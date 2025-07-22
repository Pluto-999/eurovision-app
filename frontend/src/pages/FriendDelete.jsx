import axios from "axios"
import toast from "react-hot-toast"

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
            <button onClick={DeleteFriend}> Delete friend </button>
        </>
    )
}

export default FriendDelete