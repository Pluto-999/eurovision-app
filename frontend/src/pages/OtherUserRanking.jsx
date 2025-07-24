import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios, { all } from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Rating } from "react-simple-star-rating"
import "../styles/Stats.css"
import Popup from "reactjs-popup"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"

function OtherUserRanking() {
    const params = useParams()
    const [allEntries, setAllEntries] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        
        const loadEntriesAndRatings = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ranking/otherUserRankings/${params.username}/${params.year}`, 
                    { withCredentials: true }
                )
                const unranked = response.data.unranked_entries
                const ranked = response.data.ranked_entries
                const combinedEntries = ranked.concat(unranked)

                for (const entry of combinedEntries) {
                    try {
                        const ratingResponse = await axios.get(`http://localhost:3000/api/rating/otherUserRating/${params.username}/${entry.country}/${params.year}`,
                            { withCredentials: true }
                        )
                        entry["rating"] = ratingResponse.data.rating > 0 ? ratingResponse.data.rating : 0
                    }
                    catch(error) {
                        console.log(error)
                        if (error.response.data.message) {
                            toast.error(error.response.data.message)
                        }
                        if (error.response.status === 404) {
                            navigate("/friends/my_friends")
                        }
                        else {
                            toast.error("Something has gone wrong, please try again")
                        }
                        break
                    }
                }
                setAllEntries(combinedEntries)
            } catch (error) {
                console.log(error)
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                }
                if (error.response.status === 404) {
                    navigate("/friends/my_friends")
                }
                else {
                    toast.error("Something has gone wrong, please try again")
                }
            }
        }

        loadEntriesAndRatings()
    }, [])


    // const isRanked = props.position > 0 ? true : false
  
    // const rankedStyle = isRanked ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-500 hover:bg-gray-400"


    return(
        <>
            <h1> {params.username}'s Ranking of {params.year} Entries </h1>
            {
                allEntries.map(entry => (
                    
                    <div key={entry.country + entry.year}>
                        <Popup
                            trigger = {
                                <button className="link">
                                    <ul>
                                        <li>Country: {entry.country}</li>
                                        <li>
                                            {entry.position < 0 ? (
                                                <>
                                                {params.username} is yet to rank {entry.country}
                                                </>
                                            ) : (
                                                <>
                                                {params.username}'s ranking: {entry.position}
                                                </>
                                            )}
                                        </li>
                                        <li>
                                            {entry.stars_rating === 0 ? (
                                                <>
                                                {params.username} is yet to rate {entry.country}
                                                </>
                                            ) : (
                                                <>
                                                {params.username}'s rating:
                                                <Rating
                                                    readonly
                                                    initialValue={entry.rating}
                                                    SVGclassName="inline"
                                                />
                                            </>
                                            )}
                                        </li>
                                    </ul>
                                </button>
                            }
                            position="center center"
                            modal
                        >
                            <div className="popup">
                                <CountryIndividualEntryPage entry={entry} />
                            </div>
                        </Popup>

                    </div>
                    
                    
                ))
            }
        </>
    )
}

export default OtherUserRanking