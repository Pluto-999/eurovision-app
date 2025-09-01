import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "../../styles/Stats.css"

function CountriesPage() {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/countries")
        .then(response => setCountries(response.data.data))
    }, [])

    return (
        <>
        <h1> List of Participating Countries since 2021 </h1>
        <div>
            <ul className="grid">
                {countries.map((country) => (
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
                ))}
            </ul>
        </div>
        </>
    )
}

export default CountriesPage