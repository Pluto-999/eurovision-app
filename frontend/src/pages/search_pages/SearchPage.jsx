import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import Popup from "../../components/Popup"
import CountryIndividualEntryPage from "../entries_pages/CountryIndividualEntryPage"
import Sort from "../../components/Sort"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import Pagination from "../../components/Pagination"

function SearchPage() {
    
    const [searchValue, setSearchValue] = useState("")
    const [searchType, setSearchType] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [madeSearch, setMadeSearch] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMadeSearch(true)

        try {
            const response = await axios.post("http://localhost:3000/api/search/", {
                searchValue, searchType
            })
            if (response.data.success) {
                setSearchResults(response.data.data)
            }
            else {
                toast.error("Something went wrong, please try again")
            }
        } 
        catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1> Search </h1>

            <fieldset className="fieldset">
                <legend className="fieldset-legend"> Choose what to search for </legend>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                        { searchType ? searchType : "Search Options" }
                    </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><button onClick={() => {
                                setSearchType("Country & Year")
                                toast.success(
                                    "Ensure to start your search in the text box, then press submit to search for the country and year", 
                                    { duration: 5000}
                                )
                            }}>
                                Country & Year
                            </button></li>
                            <li><button onClick={() => {
                                setSearchType("Artist")
                                toast.success(
                                    "Ensure to start your search in the text box, then press submit to search for artists",
                                    { duration: 5000 }
                                )
                            }}>
                                Artist
                            </button></li>
                            <li><button onClick={() => {
                                setSearchType("Song")
                                toast.success(
                                    "Ensure to start your search in the text box, then press submit to search for songs",
                                    { duration: 5000}
                                )
                            }}>
                                Song
                            </button></li>
                        </ul>
                </div>
            </fieldset>

            <form onSubmit={handleSubmit}>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Search </legend>
                    <input 
                        type="text"
                        className="input"
                        placeholder="Start your search"
                        onChange={(e) => setSearchValue(e.target.value)}
                        required={true}
                    />
                </fieldset>

                <input type="submit" className="btn"/>
            </form>
            
            {
                loading ? (
                    <div className="loader">
                        <Ring />
                    </div>
                ) : (
                    searchResults.length > 0 ? (
                        <>
                            <div className="flex gap-5 items-center">
                                <h2> Search Results </h2>
                                <Sort 
                                    data={searchResults}
                                    setData={setSearchResults}
                                    includeCountry={true}
                                    includeYear={true}
                                />
                            </div>

                            <Pagination 
                                data={searchResults}
                                itemsPerPage={10}
                                renderDataItem={(item) => (
                                    <Popup 
                                        entryCountry={item.country}
                                        entryYear={item.year}
                                        listItems={
                                            <>
                                                <li> Country: {item.country} </li>
                                                <li> Year: {item.year} </li>
                                                <li> Artist: {item.artist} </li>
                                                <li> Song: {item.song} </li>
                                                <li> Overall Result: {item.position} ({item.finalOrSemi})</li>
                                            </>
                                        }
                                        popupContent={
                                            <CountryIndividualEntryPage 
                                                entryCountry={item.country}
                                                entryYear={item.year}
                                            />
                                        }
                                        buttonStyling={"link"}
                                    />
                                )}
                            />
                        </>
                    ) : (   
                        madeSearch ? 
                            <div> No results, please try a different search </div>
                        :
                            <></>
                    )
                )
            }
        </>
    )
}

export default SearchPage