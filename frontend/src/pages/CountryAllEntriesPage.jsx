import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"
import "../styles/Stats.css"
import toast from "react-hot-toast"
import Popup from "../components/Popup"

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
        <h1> List of Entries for {params.country} </h1>
        <ul className="grid">
            {entries.map(entry => (
                <Popup 
                    entry={entry}
                    listItems={
                        <>
                            <li> Year: {entry.year} </li>
                            <li> Artist: {entry.artist} </li>
                            <li> Song: {entry.song} </li>
                        </>
                    }
                    popupContent={
                        <CountryIndividualEntryPage entry={entry} />
                    }
                />
                )
            )}
            </ul>
        </>
    )
}

export default CountryAllEntriesPage