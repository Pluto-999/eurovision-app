import api from "../../utils/axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function ResetPassword () {
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [searchParams] = useSearchParams()
    
    const token = searchParams.get("token")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordOne !== passwordTwo) {
            toast.error("Your passwords do not match! Please ensure you type out your new password twice")
            return
        }

        try {
            const response = await api.post("/auth/reset-password", { password: passwordOne, token })
            toast.success(response.data.message)
            navigate("/account/login")
        }
        catch (error) {
            toast.error(error.response.data.message)
        } 
    }

    return (
        <div className="whole_page">
            <h2> Reset your password </h2>
            
            <form onSubmit={handleSubmit} className="w-96">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> New Password </legend>
                    <input 
                        type="password"
                        className="input"
                        placeholder="Enter your new password"
                        onChange={(e) => setPasswordOne(e.target.value)}
                        required={true}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Confirm your new Password </legend>
                    <input 
                        type="password"
                        className="input"
                        placeholder="Please enter your new password again"
                        onChange={(e) => setPasswordTwo(e.target.value)}
                        required={true}
                    />
                </fieldset>

                <input type="submit" className="btn"></input>
            </form>
        </div>
    )
}

export default ResetPassword