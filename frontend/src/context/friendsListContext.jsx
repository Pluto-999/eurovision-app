import { createContext, useContext, useEffect, useState } from "react"
import api from "../utils/axios"

const FriendsListContext = createContext(null)

export function FriendsListContextProvider({ children }) {

    const [friendsList, setFriendsList] = useState([])

    useEffect(() => {
        api.get("/friends/my_friends")
        .then(response => {
            setFriendsList(response.data.friends)
        })
        .catch(error => {
            console.log(error)
            setFriendsList([])
        })
    }, [])

    return (
        <FriendsListContext.Provider value={{ friendsList, setFriendsList }}>
            { children }
        </FriendsListContext.Provider>
    )
}

export function useFriendsListContext() {
    const friendsList = useContext(FriendsListContext)
    return friendsList
}