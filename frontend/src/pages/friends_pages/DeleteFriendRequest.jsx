import api from "../../utils/axios"
import toast from "react-hot-toast"
import { IoPersonRemove } from "react-icons/io5"

function DeleteFriendRequest({ username, onAccepted }) {

    const deleteRequest = async () => {
        try {
            const response = await api.delete(`/friends/delete_request/${username}`)
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
            onClick={deleteRequest}
        > 
            <IoPersonRemove />
            Delete Request
        </button>
    )
}

export default DeleteFriendRequest