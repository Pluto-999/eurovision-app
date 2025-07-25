import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import "../styles/Stats.css"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"
import Popup from 'reactjs-popup'
import ExtraUserStatsPopup from "./ExtraUserStatsPopup"

function AllUserRankings() {
    const params = useParams()
    const [rankings, setRankings] = useState([])
    
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
    }, [])

    return (
        <>
            <h1> Community Results for {params.year} </h1>
            {
                rankings.map(ranking => (
                    <div key={ranking.country + ranking.year}>
                        <Popup
                            trigger={
                                <button className="link">
                                    <ul>
                                        <li> Country: {ranking.country}</li>
                                        <li> Total Points: {ranking.points}</li>
                                    </ul>
                                </button>
                            }
                            position="center center"
                            modal
                        >
                            <div className="popup">
                                <CountryIndividualEntryPage entry={ranking} />
                                <ExtraUserStatsPopup country={ranking.country} year={ranking.year} />
                            </div>
                        </Popup>
                    </div>
                ))
            }
        </>
    )
}

export default AllUserRankings