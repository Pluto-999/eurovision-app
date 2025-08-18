import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function SingleResultsPage({ entryCountry, entryYear }) {
    const params = useParams()
    const [results, setResults] = useState([])

    const country = params.country ? params.country : entryCountry
    const year = params.year ? params.year : entryYear

    useEffect(() => {
        axios.get(`http://localhost:3000/api/results/${country}/${year}`)
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

    let qualified = true

    return (
        <>
            <div> 
                {
                    results.semi_result?.length === 0 ? (
                        <>
                        <h2> Semi Final Result </h2>
                        <div> Automatic Qualifier for this year, so has no Semi Final Result </div>
                        </>
                    ) : (
                        <>
                            <h2> Semi Final Result (Semi Final {results.semi_result?.[0].semi_number}) </h2>
                            <div> {results.semi_result?.map(result => (
                                <ul key={result.country + result.year}>
                                    <li> Position: { result.position }</li>
                                    <li> Points: { result.points }</li>
                                    <li> Running Order: { result.running_order }</li>
                                    <li>{result.is_nq ? qualified = false: qualified = true}</li>
                                </ul>
                            ))}
                            </div>
                        </>
                    ) 
                    
                } 
            </div>

            <h2> Final Result </h2>
            <div> {!qualified && <div> Did not qualify for the Grand Final </div>}</div>
            <div> {qualified && results.final_result?.map( result => (
                <ul key={result.country + result.year}>
                    <li> Position: { result.position }</li>
                    <li> Points: { result.points }</li>
                    <li> Running Order: { result.running_order }</li>
                </ul>
            ))}
            </div>
        </>
    )
}

export default SingleResultsPage