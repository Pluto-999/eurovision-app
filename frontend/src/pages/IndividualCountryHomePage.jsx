import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import CountryAllEntriesPage from "../pages/CountryAllEntriesPage"
import CountryResultsPage from "./CountryResultsPage"

function IndividualCountryHomePage() {
    const params = useParams()
    const [entries, setEntries] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/entries/country/${params.country}`)
        .then(response => setEntries(response.data.data))
    }, [])

    return (
        <>
        <CountryAllEntriesPage />
        <CountryResultsPage />
        </>
    )
}

export default IndividualCountryHomePage