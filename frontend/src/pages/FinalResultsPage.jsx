import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function FinalResultsPage() {
    const params = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/results/final/${params.year}`)
        .then(response => setResults(response.data.data))
    }, [])

    return (
        <>
            <div> Final Results Page</div>
            <div> {results.map(result => (
                <li key={result.country + result.year}> 
                <p> Country: {result.country}</p>
                <p> Position: {result.position}</p>
                <p> Points: {result.points}</p>
                <p> Running Order: {result.running_order}</p> 
                </li>
            ))} </div>
        </>
    )
}

export default FinalResultsPage