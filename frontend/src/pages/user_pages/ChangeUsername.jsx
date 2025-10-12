import { useState } from "react"
import api from "../../utils/axios"
import toast from "react-hot-toast"
import { Ring } from "ldrs/react"
import { useUserContext } from "../../context/userContext"

function ChangeUsername() {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUserContext()


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await api.patch("/user/changeUsername", { username })
            setUser({ ...user, username: response.data.payload.username})

            toast.success("Your username has been successfully updated")
        }
        catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something went wrong, please try again")
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="whole_page">
            <h1> Change your Username </h1>

            <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Change your username </legend>
                    <input 
                        type="text"
                        className="input"
                        placeholder="Enter your new username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </fieldset>
                <input type="submit" className="btn"/>
            </form>

            {loading && (
                <div className="loader">
                    <Ring />
                </div>
            )}
        </div>
    )
}

export default ChangeUsername