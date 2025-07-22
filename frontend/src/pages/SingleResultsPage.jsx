import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function SingleResultsPage({ entry }) {
    const params = useParams()
    const [results, setResults] = useState([])

    const country = params.country ? params.country : entry.country
    const year = params.year ? params.year : entry.year

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


    const semi_result = results.semi_result?.[0]
    const final_result = results.final_result?.[0]
    console.log(results)

    let qualified = true

    return (
        <>
            <div> { year } Results Page for { country }</div>

            <div> 
                {
                    results.semi_result?.length === 0 ? (
                        <div> Automatic Qualifier for this year, so has no Semi Final Result </div>
                    ) : (
                        <>
                            <div> Semi Final Result (Semi Final {results.semi_result?.[0].semi_number}) </div>
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

            <div> Final Result </div>
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