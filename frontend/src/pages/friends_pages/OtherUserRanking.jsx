import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Rating } from "react-simple-star-rating"
import "../../styles/Stats.css"
import Popup from "../../components/Popup"
import CountryIndividualEntryPage from "../entries_pages/CountryIndividualEntryPage"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"

function OtherUserRanking() {
    const params = useParams()
    const [allEntries, setAllEntries] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        
        const loadEntriesAndRatings = async () => {
            try {
                setLoading(true)
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
            finally {
                setLoading(false)
            }
        }

        loadEntriesAndRatings()
    }, [])

    const rankedEntries = []
    const unrankedEntries = []

    for (let i = 0; i < allEntries.length; i++) {
        if (allEntries[i].position < 0) {
            unrankedEntries.push(allEntries[i])
        }
        else {
            rankedEntries.push(allEntries[i])
        }
    }

    return(
        <>
            <h1> {params.username}'s Ranking of {params.year} Entries </h1>
            
            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
                <>
                {rankedEntries.length > 0 && (
                <>
                    <h2> Ranked Entries</h2>
                    <ul className="grid">
                    {
                        rankedEntries.map(entry => (
                            <Popup 
                                entryCountry={entry.country}
                                entryYear={entry.year}
                                listItems={
                                    <>
                                        <li> Country: {entry.country} </li>
                                        <li> Ranking: {entry.position} </li>
                                        <li>
                                            {entry.stars_rating === 0 ? (
                                                <>
                                                {params.username} is yet to give {entry.country} a stars rating
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
                                    </>
                                }
                                popupContent={
                                    <CountryIndividualEntryPage 
                                        entryCountry={entry.country}
                                        entryYear={entry.year} 
                                    />
                                }
                                buttonStyling={"link"}
                            />
                        ))
                    }
                    </ul>
                </>
                )}
                
                {unrankedEntries.length > 0 && (
                <> 
                    <h2> Unranked Entries </h2>
                    <ul className="grid">
                    {
                        unrankedEntries.map(entry => (
                            <Popup 
                                entryCountry={entry.country}
                                entryYear={entry.year}
                                listItems={
                                    <>
                                    <li> Country: {entry.country} </li>
                                    <li>
                                        {entry.stars_rating === 0 ? (
                                            <>
                                            {params.username} is yet to give {entry.country} a stars rating
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
                                    </>
                                }
                                popupContent={
                                    <CountryIndividualEntryPage 
                                        entryCountry={entry.country}
                                        entryYear={entry.year}
                                    />
                                }
                                buttonStyling={"link"}
                            />
                        ))
                    }
                    </ul>
                </>
                )}
                </>
            )}
        </>
    )
}

export default OtherUserRanking