import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../utils/axios"
import toast from "react-hot-toast"
import "../../styles/Stats.css"
import CountryIndividualEntryPage from "../entries_pages/CountryIndividualEntryPage"
import ExtraUserStatsPopup from "./ExtraUserStatsPopup"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import ResultsTable from "../../components/ResultsTable"

function AllUserRankings() {
    const params = useParams()
    const [rankings, setRankings] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        api.get(`/userstats/results/${params.year}`)
        .then(response => {
            setRankings(response.data.data)
        })
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
        <div className="whole_page">
            <h1> Community Results for {params.year} </h1>
            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
                <ResultsTable 
                    results={rankings}
                    includePoints={true}
                    renderPopupContent={(result) => (
                        <>
                                <CountryIndividualEntryPage 
                                    entryCountry={result.country}
                                    entryYear={result.year}
                                    noResults={true}
                                />
                                <ExtraUserStatsPopup country={result.country} year={result.year} />
                                </>
                    )}
                />
            )}

        </div>
    )
}

export default AllUserRankings