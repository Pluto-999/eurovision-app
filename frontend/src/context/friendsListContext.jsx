import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const FriendsListContext = createContext(null)

export function FriendsListContextProvider({ children }) {

    const [friendsList, setFriendsList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/friends/my_friends", 
            { withCredentials: true }
        )
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