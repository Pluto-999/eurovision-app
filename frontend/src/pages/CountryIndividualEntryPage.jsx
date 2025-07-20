import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import SingleResultsPage from "../pages/SingleResultsPage"
import ChangeUserRating from "../pages/ChangeUserRating"

function CountryIndividualEntryPage() {
    const params = useParams()
    const [entry, setEntry] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/entries/${params.country}/${params.year}`)
        .then(response => setEntry(response.data.data))
    }, [])

    return (
        <>

        <div>
            <ul>
                <li> Artist: {entry.artist} </li>
                <li> Song: {entry.song} </li>
                <li> <a href={entry.spotify_url}>Spotify Link</a></li>
                <li> <a href={entry.yt_url}><img src={entry.yt_thumbnail}></img></a></li>
            </ul>

            <SingleResultsPage />

            {/* <h2> Your rating of this country: </h2>
            <ChangeUserRating /> */}
        </div>

        </>
    )
}

export default CountryIndividualEntryPage