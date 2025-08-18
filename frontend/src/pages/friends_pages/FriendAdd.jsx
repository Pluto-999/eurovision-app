import axios from "axios"
import toast from "react-hot-toast"

function FriendAdd({ username }) {

    const addFriend = async () => {
        axios.post("http://localhost:3000/api/friends/add", {
            username: username
        }, { withCredentials: true })
        .then(() => {
            toast("Friend successfully added", {
                icon: "✅"
            })
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
            if (error.response.status === 401) {
                navigate("/account")
            } 
        })
    }

    return (
        <>
            <button onClick={addFriend}> Add friend </button>
        </>
    )
}

export default FriendAdd