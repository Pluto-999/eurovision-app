import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

function ForgotPassword() {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/forgot-password", 
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
        <>
            <h2> Forgot your Password? </h2>

            <form onSubmit={handleSubmit}>
                
                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Email </legend>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Enter your email to reset your password"
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </fieldset>

                <input type="submit" className="btn"></input>
            </form>
        </>
    )
}

export default ForgotPassword