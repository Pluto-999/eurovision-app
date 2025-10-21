import { createContext, useContext, useEffect, useState } from "react"
import api from "../utils/axios"

const UserContext = createContext(null)

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/user/home")
        .then(response => {
            setUser(response.data.user)
        })
        .catch(error => {
            console.log(error)
            setUser(null)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const user = useContext(UserContext)
    return user
}