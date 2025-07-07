import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function SingleResultsPage() {
    const params = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/results/${params.country}/${params.year}`)
        .then(response => setResults(response.data.data))
    }, [])


    const semi_result = results.semi_result?.[0]
    const final_result = results.final_result?.[0]
    console.log(final_result)

    let qualified = false

    return (
        <>
            <div> { params.year } Results Page for { params.country }</div>

            <div> Semi Final Result (Semi Final {results.semi_result?.[0].semi_number}): </div>
            <div> {results.semi_result?.map(result => (
                <li key={result.country + result.year}>
                    <p> Position: { result.position }</p>
                    <p> Points: { result.points }</p>
                    <p> Running Order: { result.running_order }</p>
                    {result.is_nq ? qualified = false: qualified = true}
                    <p></p>
                </li>
            ))} 
            </div>

            <div>Final Result:</div>
            <div> {!qualified && <div> Did not qualify for the Grand Final </div>}</div>
            <div> {qualified && results.final_result?.map( result => (
                <li key={result.country + result.year}>
                    <p> Position: { result.position }</p>
                    <p> Points: { result.points }</p>
                    <p> Running Order: { result.running_order }</p>
                </li>
            ))}
            </div>
        </>
    )
}

export default SingleResultsPage