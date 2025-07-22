import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import SingleResultsPage from "../pages/SingleResultsPage"
import ChangeUserRating from "../pages/ChangeUserRating"

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
                <li> <a href={entryData.spotify_url}>Spotify Link</a></li>
                <li> <a href={entryData.yt_url}><img src={entryData.yt_thumbnail}></img></a></li>
            </ul>

            <SingleResultsPage entry={entry}/>

            {/* <h2> Your rating of this country: </h2>
            <ChangeUserRating /> */}
        </div>

        </>
    )
}

export default CountryIndividualEntryPage