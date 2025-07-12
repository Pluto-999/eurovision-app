import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function CountriesPage() {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/countries")
        .then(response => setCountries(response.data.data))
    }, [])

    console.log(countries)

    return (
        <>
        <h1> List of Participating Countries since 2021 </h1>
        <div>
            {countries.map(country => (
                <ul key={country.country}>
                    <Link to={`/entries/country/${country.country}`}>
                        <li> Country: {country.country} </li>
                        <li> <img src={country.flag_image} alt="Flag of respective country"></img></li>
                    </Link>
                </ul>
            ))}

        </div>
        </>
    )
}

export default CountriesPage