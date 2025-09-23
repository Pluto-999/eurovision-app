import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const UserContext = createContext(null)

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/api/user/home",
            { withCredentials: true })
        .then(response => {
            setUser(response.data.user)
        })
        .catch(error => {
            console.log(error)
            setUser(null)
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const user = useContext(UserContext)
    return user
}