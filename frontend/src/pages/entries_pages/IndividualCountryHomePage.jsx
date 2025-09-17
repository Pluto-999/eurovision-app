import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import CountryIndividualEntryPage from "./CountryIndividualEntryPage"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import toast from "react-hot-toast"
import Sort from "../../components/Sort"

function IndividualCountryHomePage() {
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [entries, setEntries] = useState([])
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const entriesRequest = await axios.get(`http://localhost:3000/api/entries/country/${params.country}`)
                const entriesData = entriesRequest.data.data

                const resultsRequest = await axios.get(`http://localhost:3000/api/results/${params.country}`)
                const semiResultsData = resultsRequest.data.data.semi_results
                const finalResultsData = resultsRequest.data.data.final_results

                for (const entry of entriesData) {
                    const year = entry["year"]
                    const finalResultThisYear = finalResultsData.find(entry => entry.year === year)
                    if (!finalResultThisYear) {
                        entry["position"] = semiResultsData.find(entry => entry.year === year)["position"]
                        entry["finalOrSemi"] = "Semi Final"
                    }
                    else {
                        entry["position"] = finalResultThisYear["position"]
                        entry["finalOrSemi"] = "Final"
                    }
                }

                setEntries(entriesData)
            
            } 
            catch (error) {
                console.log(error)
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message)
                }
                else {
                    toast.error("Something has gone wrong, please try again")
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="flex gap-5 items-center">
                <h1> {params.country} in Eurovision </h1>
                <Sort 
                    data={entries}
                    setData={setEntries}
                    endPosition={true}
                    includeYear={true}
                />
            </div>
            {loading ? (
                <div className="loader">
                    <Ring />
                </div>
            ) : (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th> Year </th>
                            <th> Artist </th>
                            <th> Song </th>
                            <th> Overall Result </th>
                        </tr>
                        </thead>
                        <tbody>
                            {entries.map(entry => (
                                <tr
                                    key={entry.country + entry.year}
                                    onClick={() => document.getElementById(`modal_${entry.country}_${entry.year}`).showModal()}
                                    className="hover:bg-[#646cff] cursor-pointer"
                                >
                                    <td> {entry.year} </td>
                                    <td> {entry.artist} </td>
                                    <td> {entry.song} </td>
                                    <td> {entry.position} ({entry.finalOrSemi})</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {entries.map(entry => (
                        <dialog 
                            key={entry.country + entry.year}
                            id={`modal_${entry.country}_${entry.year}`} className="modal"
                        >
                            <div className="modal-box w-11/12 max-w-2xl text-center content-center">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <CountryIndividualEntryPage 
                                    entryCountry={entry.country}
                                    entryYear={entry.year}
                                />
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    ))}
                </>
            )}
        </>
    )
}

export default IndividualCountryHomePage