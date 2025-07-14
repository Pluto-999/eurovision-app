import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function CountryAllEntriesPage() {
    const params = useParams()
    const [entries, setEntries] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/entries/country/${params.country}`)
        .then(response => setEntries(response.data.data))
    }, [])

    return (
        <>
        <h1> List of Entries for {params.country} </h1>

        <div>
            {
                entries.map(entry => (
                    <ul key={entry.country + entry.year}>
                        <li> Year: {entry.year} </li>
                        <li> Artist: {entry.artist} </li>
                        <li> Song: {entry.song} </li>
                    </ul>
                ))
            }
        </div>
        </>
    )
}

export default CountryAllEntriesPage