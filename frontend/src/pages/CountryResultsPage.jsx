import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function CountryResultsPage() {
    const params = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/results/${params.country}`)
        .then(response => setResults(response.data.data))
        .catch(error => console.log(error))
    }, [])

    console.log(results)
    console.log(results.semi_results?.[0])

    return (
        <>
            <div> Results for {params.country} </div>
            {/* <div> {results.map(result => (
                <li key={result.country + result.year}> 
                <p> Country: {result.country}</p>
                <p> Position: {result.position}</p>
                <p> Points: {result.points}</p>
                <p> Running Order: {result.running_order}</p> 
                </li>
            ))} </div> */}
            <div></div>
        </>
    )
}

export default CountryResultsPage