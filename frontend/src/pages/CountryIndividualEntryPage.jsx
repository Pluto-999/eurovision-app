import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import SingleResultsPage from "../pages/SingleResultsPage"
import { FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import "../styles/Stats.css"

function CountryIndividualEntryPage({ entry }) {
    const params = useParams()
    const [entryData, setEntryData] = useState([])

    const country = params.country ? params.country : entry.country
    const year = params.year ? params.year : entry.year

    useEffect(() => {
        axios.get(`http://localhost:3000/api/entries/${country}/${year}`)
        .then(response => setEntryData(response.data.data))
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

    return (
        <>
        <div>
            <ul>
                <li> Artist: {entryData.artist} </li>
                <li> Song: {entryData.song} </li>
                <li><a href={entryData.yt_url}><FaYoutube size={40}/></a></li>
                <li><a href={entryData.spotify_url}><FaSpotify size={40}/></a></li>
                <li>
                    <div className="crop">
                        <img src={entryData.yt_thumbnail} className="w-full h-full object-cover object-center"></img>
                    </div>
                </li>
                
            </ul>

            <SingleResultsPage entry={entry}/>

        </div>

        </>
    )
}

export default CountryIndividualEntryPage