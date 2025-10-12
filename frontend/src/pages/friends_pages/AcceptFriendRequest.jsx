import api from "../../utils/axios"
import toast from "react-hot-toast"
import { IoPersonAdd } from "react-icons/io5"

function AcceptFriendRequest({ username, onAccepted }) {

    const acceptRequest = async () => {
        try {
            const response = await api.patch("/friends/accept_friend_request", 
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
        <button className="btn btn-soft btn-success" 
            onClick={acceptRequest}
        >
            <IoPersonAdd />
            Accept
        </button>
    )
}

export default AcceptFriendRequest