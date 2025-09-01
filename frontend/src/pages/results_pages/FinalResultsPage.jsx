import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../../styles/Stats.css"
import Popup from "../../components/Popup"
import CountryIndividualEntryPage from "../entries_pages/CountryIndividualEntryPage"
import Sort from "../../components/Sort"

function FinalResultsPage() {
    const params = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/results/final/${params.year}`)
        .then(response => setResults(response.data.data))
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
            <div className="flex gap-5 items-center">
                <h1> {params.year} Final Results Page </h1>
                <Sort 
                    data={results} 
                    setData={setResults} 
                    endPosition={true}
                    includeRunningOrder={true}
                    includeCountry={true}
                />
            </div>
            <ul className="grid">
            {
                results.map(result => (
                    <Popup 
                        entryCountry={result.country}
                        entryYear={result.year}
                        listItems={
                            <>
                                <li> Country: {result.country}</li>
                                <li> Position: {result.position}</li>
                                <li> Points: {result.points}</li>
                                <li> Running Order: {result.running_order}</li> 
                            </>
                        }
                        popupContent={
                            <CountryIndividualEntryPage 
                                entryCountry={result.country}
                                entryYear={result.year} 
                            />
                        }
                        buttonStyling={"link"}
                    />
                ))
            }
            </ul>
        </>
    )
}

export default FinalResultsPage