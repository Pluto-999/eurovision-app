import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../../styles/Stats.css"
import CountryIndividualEntryPage from "../entries_pages/CountryIndividualEntryPage"
import toast from "react-hot-toast"
import Sort from "../../components/Sort"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import ResultsTable from "../../components/ResultsTable"

function SemiResultsPage() {
    const params = useParams()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:3000/api/results/semi/${params.semi_number}/${params.year}`)
        .then(response => setResults(response.data.data))
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
            <div className="flex gap-5 items-center">
                <h1> {params.year} Semi Results {params.semi_number} Page </h1>
                <Sort 
                    data={results} 
                    setData={setResults} 
                    endPosition={true}
                    includeRunningOrder={true}
                    includeCountry={true}
                />
            </div>
            
            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
                <ResultsTable 
                    includeRunningOrder={true}
                    includePoints={true}
                    results={results}
                    renderPopupContent={(result) => (
                        <CountryIndividualEntryPage 
                            entryCountry={result.country}
                            entryYear={result.year} 
                        />
                    )}
                />
            )}
        </div>
    )
}

export default SemiResultsPage