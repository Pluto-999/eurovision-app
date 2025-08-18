import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import "../../styles/Stats.css"
import CountryIndividualEntryPage from "../entries_pages/CountryIndividualEntryPage"
import Popup from "../../components/Popup"
import ExtraUserStatsPopup from "./ExtraUserStatsPopup"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"


function AllUserRankings() {
    const params = useParams()
    const [rankings, setRankings] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/userstats/results/${params.year}`)
        .then(response => {
            setRankings(response.data.data)
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something has gone wrong, please try again")
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading ? ( <Ring />) : (
            <>
            <h1> Community Results for {params.year} </h1>
            <ul className="grid">
            {
                rankings.map(ranking => (
                    <Popup 
                        entryCountry={ranking.country}
                        entryYear={ranking.year}
                        listItems={
                            <>
                                <li> Country: {ranking.country}</li>
                                <li> Total Points: {ranking.points}</li>
                            </>
                        }
                        popupContent={
                            <>
                            <CountryIndividualEntryPage 
                                entryCountry={ranking.country}
                                entryYear={ranking.year}
                            />
                            <ExtraUserStatsPopup country={ranking.country} year={ranking.year} />
                            </>
                        }
                        buttonStyling={"link"}
                    />

                ))
            }
            </ul>
            </>
            )}
        </>
    )
}

export default AllUserRankings