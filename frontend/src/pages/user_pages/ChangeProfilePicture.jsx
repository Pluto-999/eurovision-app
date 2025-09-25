import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Ring } from "ldrs/react"
import { useUserContext } from "../../context/userContext"

function ChangeProfilePicture() {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUserContext()

    const handleUpload = async (e) => {
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

    const handleReset = async () => {
        try {
            setLoading(true)
            const response = await axios.patch("http://localhost:3000/api/user/resetProfilePicture",
                {}, { withCredentials: true }
            )
            setUser({ ...user, profile_picture: response.data.profilePicture })

            toast.success("Profile picture was successfully reset to default")
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
        <h1> Change your profile picture </h1>

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Pick a profile picture</legend>
                <input 
                type="file" 
                className="file-input" 
                onChange={(e) => setImage(e.target.files[0])}
                required
                />
                <label className="label">Max size 2MB</label>
            </fieldset>

            <div className="flex gap-4">
                <input type="submit" value="Upload" className="btn" />
                <button type="button" onClick={handleReset} className="btn btn-soft btn-error">
                Reset to default
                </button>
            </div>
        </form>

        {loading && (
            <div className="loader">
                <Ring />
            </div>
        )}
        </div>
    )
}

export default ChangeProfilePicture