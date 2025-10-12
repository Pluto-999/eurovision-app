import api from "../../utils/axios"
import { useState } from "react"
import toast from "react-hot-toast"

function ForgotPassword() {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post(
                "/auth/forgot-password", 
                { email }
            )
            toast.success(response.data.message)
        }
        catch (error) {
            console.log(error.response.data.message)
            toast.error("Sorry, something went wrong. Please try again")
        }
    }

    return (
        <div className="whole_page">
            <h2> Forgot your Password? </h2>
            <form onSubmit={handleSubmit} className="w-96">
                
                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Enter your email to reset your password</legend>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </fieldset>

                <input type="submit" className="btn"></input>
            </form>
        </div>
    )
}

export default ForgotPassword