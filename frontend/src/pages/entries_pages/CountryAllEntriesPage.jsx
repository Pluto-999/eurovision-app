import { useEffect, useState } from "react"
import api from "../../utils/axios"
import { useParams } from "react-router-dom"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"
import "../../styles/Stats.css"
import toast from "react-hot-toast"
import Popup from "../../components/Popup"

function CountryAllEntriesPage() {
    const params = useParams()
    const [entries, setEntries] = useState([])

    useEffect(() => {
        api.get(`/entries/country/${params.country}`)
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
        <div className="whole_page">
        <h1> List of Entries for {params.country} </h1>
        <ul className="grid">
            {entries.map(entry => (
                <Popup 
                    entryCountry={entry.country}
                    entryYear={entry.year}
                    listItems={
                        <>
                            <li> Year: {entry.year} </li>
                            <li> Artist: {entry.artist} </li>
                            <li> Song: {entry.song} </li>
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
                )
            )}
            </ul>
        </div>
    )
}

export default CountryAllEntriesPage