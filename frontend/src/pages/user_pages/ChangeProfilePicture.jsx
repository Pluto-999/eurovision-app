import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Ring } from "ldrs/react"
import { useUserContext } from "../../context/userContext"

function ChangeProfilePicture() {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUserContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("profilePicture", image)

        try {
            setLoading(true)
            const response = await axios.patch(
                "http://localhost:3000/api/user/changeProfilePicture", formData,
                {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
                }
            )
            setUser({ ...user, profile_picture: response.data.profilePicture })
            
            toast.success("Successfully updated your profile picture")
        }
        catch (error) {
            console.log(error)
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
        <>
        <h1> Change your profile picture </h1>
        <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Pick a profile picture</legend>
                <input 
                    type="file" 
                    className="file-input" 
                    onChange={(e) => setImage(e.target.files[0])}
                    required={true}
                />
                <label className="label">Max size 2MB</label>
            </fieldset>

            <input type="submit" className="btn" />
        </form>

        {loading && (
            <div className="loader">
                <Ring />
            </div>
        )}
        </>
    )
}

export default ChangeProfilePicture