import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../styles/Stats.css"
import Popup from "reactjs-popup"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"

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
            <h1> {params.year} Final Results Page</h1>
            <ul className="grid">
            {
                results.map(result => (
                    <li key={result.country + result.year}>
                        <Popup
                            trigger={
                                <button className="link">
                                    <ul>
                                        <li> Country: {result.country}</li>
                                        <li> Position: {result.position}</li>
                                        <li> Points: {result.points}</li>
                                        <li> Running Order: {result.running_order}</li> 
                                    </ul>
                                </button>
                            }
                            position="center center"
                            modal
                        >
                            <div className="popup">
                                <CountryIndividualEntryPage entry={result} /> 
                            </div>
                        </Popup>
                    </li>
                ))
            }
            </ul>
        </>
    )
}

export default FinalResultsPage