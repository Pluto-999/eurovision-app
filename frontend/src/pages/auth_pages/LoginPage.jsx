import api from "../../utils/axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import socket from "../../socket"
import { Link } from "react-router-dom"
import { useUserContext } from "../../context/userContext"
import "../../styles/links.css"

function LoginPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useUserContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("/auth/login", {username, password})
            
            if (response.data.success) {
                toast.success("Successfully logged in")
                setUser(response.data.user)
                navigate("/user/home")

                if (!socket.connected) {
                    socket.connect()
                }
            }
            else {
                toast.error("Something went wrong, please try again")
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
            <h1> Login </h1>
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
                    <legend className="fieldset-legend"> Password </legend>
                    <input 
                        type="password" 
                        className="input" 
                        placeholder="Enter your password" 
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>

                <div className="flex py-3">
                    <Link to="/account/forgot_password" className="text_link">Forgot Password?</Link>
                </div>

                <input type="submit" className="btn"></input>
            </form>
        </div>
    )
}

export default LoginPage