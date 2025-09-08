import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import CountryAllEntriesPage from "./CountryAllEntriesPage"
import CountryResultsPage from "../results_pages/CountryResultsPage"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import toast from "react-hot-toast"

function IndividualCountryHomePage() {
    const params = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:3000/api/entries/country/${params.country}`)
        .then(response => {})
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something has gone wrong, please try again")
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
        {loading ? (
            <div className="loader">
                <Ring />
            </div>
        ) : (
            <>
            <CountryAllEntriesPage />
            <CountryResultsPage />
            </>
        )}
        </>
    )
}

export default IndividualCountryHomePage