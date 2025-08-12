import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../styles/Stats.css"
import Popup from "reactjs-popup"
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
                    <li key={result.country + result.year} className="card">
                        <button className="btn link" onClick={()=>document.getElementById(`modal_${result.country}_${result.year}`).showModal()}>
                        <ul>
                            <li> Country: {result.country}</li>
                            <li> Position: {result.position}</li>
                            <li> Points: {result.points}</li>
                            <li> Running Order: {result.running_order}</li> 
                        </ul>
                        </button>
                        <dialog id={`modal_${result.country}_${result.year}`} className="modal">
                            <div className="modal-box w-11/12 max-w-2xl text-center content-center">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <CountryIndividualEntryPage entry={result} />
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </li>
                ))
            }
            </ul>
        </>
    )
}

export default SemiResultsPage