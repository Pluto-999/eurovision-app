import axios from "axios"
import toast from "react-hot-toast"
import { IoPersonAdd } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useFriendsListContext } from "../../context/friendsListContext"

function FriendAdd({ username }) {
    const { setFriendsList } = useFriendsListContext()
    const navigate = useNavigate()

    const addFriend = async () => {
        axios.post("http://localhost:3000/api/friends/add", {
            username: username
        }, { withCredentials: true })
        .then((response) => {
            toast.success("Friend successfully added")
            setFriendsList(prev => [...prev, response.data.newFriend])
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast.error(error.response.data.message)
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
            <button className="btn btn-soft btn-success" onClick={addFriend}> 
                <IoPersonAdd />
                Add friend 
            </button>
        </>
    )
}

export default FriendAdd