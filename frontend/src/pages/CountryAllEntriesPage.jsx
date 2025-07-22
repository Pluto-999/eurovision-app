import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"
import Popup from 'reactjs-popup'
import "../styles/Stats.css"

function CountryAllEntriesPage() {
    const params = useParams()
    const [entries, setEntries] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/entries/country/${params.country}`)
        .then(response => setEntries(response.data.data))
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
        <h1> List of Entries for {params.country} </h1>

        {entries.map(entry => (
            <div key={entry.country + entry.year}>
                <Popup 
                    trigger={
                    <button className="link"> 
                        <ul>
                            <li> Year: {entry.year} </li>
                            <li> Artist: {entry.artist} </li>
                            <li> Song: {entry.song} </li>
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
        ))}
        </div>
        </>
    )
}

export default CountryAllEntriesPage