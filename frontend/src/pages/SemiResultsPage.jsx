import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../styles/Stats.css"
import Popup from "../components/Popup"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"
import toast from "react-hot-toast"

function SemiResultsPage() {
    const params = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/results/semi/${params.semi_number}/${params.year}`)
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
            <h1> {params.year} Semi Results {params.semi_number} Page</h1>
            <ul className="grid">
            {
                results.map(result => (
                    <Popup 
                        entry={result}
                        listItems={
                            <>
                                <li> Country: {result.country}</li>
                                <li> Position: {result.position}</li>
                                <li> Points: {result.points}</li>
                                <li> Running Order: {result.running_order}</li>   
                            </>
                        }
                        popupContent={
                            <CountryIndividualEntryPage entry={result} />
                        }
                    />
                ))
            }
            </ul>
        </>
    )
}

export default SemiResultsPage