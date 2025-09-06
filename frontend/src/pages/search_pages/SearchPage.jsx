import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

function SearchPage() {
    
    const [searchValue, setSearchValue] = useState("")
    const [searchType, setSearchType] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/api/search/", {
                searchValue, searchType
            })
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                console.log("SOMETHING WENT WRONG !!!")
            }
        } 
        catch (error) {
            toast.error(error.response.data.message)
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
        </>
    )
}

export default SearchPage