import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function SingleResultsPage({ entryCountry, entryYear }) {
    const params = useParams()
    const [results, setResults] = useState({
        semi_result: [],
        final_result: []
    })

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

    return (
        <>
            <div> 
                {
                    results.semi_result.length === 0 ? (
                        <>
                        <h2> Semi Final Result </h2>
                        <div> Automatic Qualifier for this year, so has no Semi Final Result </div>
                        </>
                    ) : (
                        <>
                            <h2>
                                <Link to={`/results/semi/${results.semi_result[0].semi_number}/${results.semi_result[0].year}`}> 
                                    Semi Final {results.semi_result[0].semi_number} Result 
                                </Link>
                            </h2>
                            <ul>
                                <li> Position: {results.semi_result[0].position} </li>
                                <li> Points: {results.semi_result[0].points} </li>
                                <li> Running Order: {results.semi_result[0].running_order} </li>
                            </ul>
                        </>
                    ) 
                    
                } 
            </div>

            <div>
                {
                    results.final_result.length === 0 ? (
                        <>
                        <h2> Final Result </h2>
                        <div> Did not qualify for the Grand Final </div>
                        </>
                    ) : (
                        <>
                            <h2>
                                <Link to={`/results/final/${results.final_result[0].year}`}> 
                                    Final Result 
                                </Link>
                            </h2>
                            <ul>
                                <li> Position: {results.final_result[0].position} </li>
                                <li> Points: {results.final_result[0].points} </li>
                                <li> Running Order: {results.final_result[0].running_order} </li>
                            </ul>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default SingleResultsPage