import api from "../../utils/axios"
import toast from "react-hot-toast"
import { IoPersonRemove } from "react-icons/io5"

function RejectFriendRequest({ username, onAccepted }) {

    const rejectRequest = async () => {
        try {
            const response = await api.patch("/friends/reject_friend_request",
                { username }
            )
            toast.success(response.data.message)
            onAccepted()
        } 
        catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something went wrong, please try again")
            }
        }
        
    }

    return (
        <button className="btn btn-soft btn-error" 
            onClick={rejectRequest}
        > 
            <IoPersonRemove />
            Reject
        </button>
    )
}

export default RejectFriendRequest