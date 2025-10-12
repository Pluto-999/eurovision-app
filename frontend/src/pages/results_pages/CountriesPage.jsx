import { useEffect, useState } from "react"
import api from "../../utils/axios"
import { Link } from "react-router-dom"
import "../../styles/Stats.css"
import { Ring } from "ldrs/react"
import "ldrs/react/Ring.css"
import toast from "react-hot-toast"
import Pagination from "../../components/Pagination"

function CountriesPage() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get("/countries")
        .then(response => setCountries(response.data.data))
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something has gone wrong, please try again")
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="whole_page"> 
        <h1> List of Participating Countries since 2021 </h1>
        {loading ? (
            <div className="loader">
                <Ring />
            </div>
        ) : (
            <Pagination 
                data={countries}
                itemsPerPage={12}
                renderDataItem={(country) => (
                    <li key={country.country}>
                        <Link 
                            to={`/entries/country/${country.country}`}
                            className="link"    
                        >
                            {country.country}
                            <img
                                src={country.flag_image}
                                alt={`Flag of ${country.country}`}
                                width="30%"
                                height="30%"
                                className="mx-auto"
                            />
                        </Link>
                    </li>
                )}
            />
        )}
        </div>
    )
}

export default CountriesPage