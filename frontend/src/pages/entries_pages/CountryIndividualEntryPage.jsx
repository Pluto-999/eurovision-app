import { useEffect, useState } from "react"
import api from "../../utils/axios"
import { useParams } from "react-router-dom"
import SingleResultsPage from "../results_pages/SingleResultsPage"
import { FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import "../../styles/Stats.css"
import toast from "react-hot-toast"
import "../../styles/links.css"

function CountryIndividualEntryPage({ entryCountry, entryYear, noResults }) {
    const params = useParams()
    const [entryData, setEntryData] = useState([])

    const country = params.country ? params.country : entryCountry
    const year = params.year ? params.year : entryYear

    useEffect(() => {
        api.get(`/entries/${country}/${year}`)
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
                <li>
                    <div className="icons">
                        <a href={entryData.yt_url} className="text_link"><FaYoutube size={40}/></a>
                        <a href={entryData.spotify_url} className="text_link"><FaSpotify size={40}/></a>
                    </div>
                </li>
                <li>
                    <div className="w-full aspect-video overflow-hidden">
                        <img 
                            src={entryData.yt_thumbnail} 
                            className="w-full h-full object-cover object-center"
                        />
                        
                    </div>
                </li>
                
            </ul>

            {
                noResults ? 
                    <></>
                :
                    <SingleResultsPage 
                    entryCountry={entryCountry}
                    entryYear={entryYear}
                    />
            }

        </div>

        </>
    )
}

export default CountryIndividualEntryPage