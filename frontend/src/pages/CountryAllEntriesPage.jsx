import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"
import "../styles/Stats.css"
import toast from "react-hot-toast"

function CountryAllEntriesPage() {
    const params = useParams()
    const [entries, setEntries] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/entries/country/${params.country}`)
        .then(response => setEntries(response.data.data))
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
        <h1> List of Entries for {params.country} </h1>
        <ul className="grid">
            {entries.map(entry => (
                <li key={entry.country + entry.year} className="card">
                    <button className="btn link" onClick={()=>document.getElementById(`modal_${entry.country}_${entry.year}`).showModal()}>
                        <ul>
                            <li> Year: {entry.year} </li>
                            <li> Artist: {entry.artist} </li>
                            <li> Song: {entry.song} </li>
                        </ul>
                    </button>
                    <dialog id={`modal_${entry.country}_${entry.year}`} className="modal">
                    <div className="modal-box w-11/12 max-w-2xl text-center content-center">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <CountryIndividualEntryPage entry={entry} />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                    </dialog>
                </li>
                )
            )}
            </ul>
        </>
    )
}

export default CountryAllEntriesPage