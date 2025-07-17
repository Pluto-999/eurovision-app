import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

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
                <label> Username: </label>
                <input 
                    type="text"
                    required={true}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                >
                </input>
                
                <label> Password: </label>
                <input
                    type="text"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                >
                </input>

                <input type="submit"></input>
            </form>
        </>
    )
}

export default LoginPage