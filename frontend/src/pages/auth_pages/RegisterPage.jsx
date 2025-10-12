import api from "../../utils/axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import socket from "../../socket"
import { useUserContext } from "../../context/userContext"

function RegisterPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useUserContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("/auth/register", {username, email, password})
            
            if (response.data.success) {
                toast.success("Account successfully created")
                setUser(response.data.user)
                navigate("/user/home")

                if (!socket.connected) {
                    socket.connect()
                }
            }
            else {
                console.log(response)
            }
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
        <div className="whole_page">
            <h1> Register </h1>
            <form onSubmit={handleSubmit} className="w-96">
                
                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Username </legend>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                </fieldset>
                
                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Email </legend>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Enter your email" 
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Password </legend>
                    <input 
                        type="password" 
                        className="input" 
                        placeholder="Enter your password" 
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>

                <input type="submit" className="btn"></input>
            </form>
        </div>
    )
}

export default RegisterPage