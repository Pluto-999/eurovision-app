import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

function OtherUserRanking() {
    const params = useParams()
    const [allEntries, setAllEntries] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/ranking/otherUserRankings/${params.username}/${params.year}`)
        .then((response) => {
            const unranked = response.data.unranked_entries
            const ranked = response.data.ranked_entries
            setAllEntries(ranked.concat(unranked))
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
        })
    }, [])

    return(
        <>
            {
                allEntries.map(entry => (
                    <ul key={entry.country + entry.year}>
                        <li>{entry.country}</li>
                        <li>{entry.position}</li>
                    </ul>
                ))
            }
        </>
    )
}

export default OtherUserRanking