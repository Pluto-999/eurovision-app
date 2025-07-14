import axios from "axios"
import { use, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                username,
                email,
                password
            }, { withCredentials: true })
            
            if (response.data.success) {
                toast("Account successfully created", {
                    icon: "✅"
                })
                navigate("/userhome")
            }
            else {
                console.log(response)
            }

        }
        catch (error) {
            console.log(error)
            toast(error.response.data.message, {
                icon: "❌"   
            })
            console.log(error.response.data.message)
        }
    }

    return (
        <>
            <h1> Register </h1>
            <form onSubmit={handleSubmit}>
                <label> Username: </label>
                <input 
                    type="text"
                    required={true}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                >
                </input>
                
                <label> Email: </label>
                <input
                    type="text"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
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

export default RegisterPage