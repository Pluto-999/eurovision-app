import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import socket from "../socket"

function LoginPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                username,
                password
            }, { withCredentials: true })
            
            if (response.data.success) {
                toast("Successfully logged in", {
                    icon: "✅"
                })
                navigate("/user/home")

                if (!socket.connected) {
                    socket.connect()
                }
            }
            else {
                toast("Something went wrong, please try again", {
                    icon: "❌"
                })
            }
        }
        catch (error) {
            toast(error.response.data.message, {
                icon: "❌"
            })
            console.log(error.response.data.message)
        }
    }

    return (
        <>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                
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

                <input type="submit" className="btn"></input>
            </form>
        </>
    )
}

export default LoginPage