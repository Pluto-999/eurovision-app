import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Stats.css";

function CountryResultsPage() {
  const params = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/results/${params.country}`)
      .then((response) => setResults(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Results for {params.country}</h1>

      {results.semi_results?.length !== 0 ? (
        <h2> Semi Final Results </h2>
        
      ) : (<></>)}

      <ul className="grid">
        {results.semi_results?.map((result) => (
          <li key={result.country + result.year}>
            <Link
              className="link"
              to={`/results/semi/${result.semi_number}/${result.year}`}
            >
              <div>
                <p>Year: {result.year}</p>
                <p>Position: {result.position}</p>
                <p>Points: {result.points}</p>
                <p>Running Order: {result.running_order}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {results.final_results?.length !== 0 ? (
        <h2> Final Results </h2>
      ) : (<></>)}

      <ul className="grid">
        {results.final_results?.map((result) => (
          <li key={result.country + result.year}>
            <Link className="link" to={`/results/final/${result.year}`}>
              <div>
                <p>Year: {result.year}</p>
                <p>Position: {result.position}</p>
                <p>Points: {result.points}</p>
                <p>Running Order: {result.running_order}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CountryResultsPage;