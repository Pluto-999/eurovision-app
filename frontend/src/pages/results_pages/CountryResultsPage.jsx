import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/axios"
import "../../styles/Stats.css";
import Sort from "../../components/Sort"
import toast from "react-hot-toast"

function CountryResultsPage() {
  const params = useParams();
  const [semiResults, setSemiResults] = useState([])
  const [finalResults, setFinalResults] = useState([])

  useEffect(() => {
    api.get(`/results/${params.country}`)
      .then((response) => {
        setSemiResults(response.data.data.semi_results)
        setFinalResults(response.data.data.final_results)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.message) {
          toast.error(error.response.data.message)
        }
        else {
          toast.error("Something has gone wrong, please try again")
        }
      });
  }, []);

  return (
    <>
      <h1>Results for {params.country}</h1>

      {semiResults?.length !== 0 ? (
        <div className="flex gap-5 items-center">
          <h2> Semi Final Results </h2>
          <Sort 
            data={semiResults} 
            setData={setSemiResults} 
            includeYear={true}  
          />
        </div>
        
      ) : (<></>)}

      <ul className="grid">
        {semiResults?.map((result) => (
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

      {finalResults?.length !== 0 ? (
        <div className="flex gap-5 items-center">
          <h2> Final Results </h2>
          <Sort 
            data={finalResults} 
            setData={setFinalResults} 
            includeYear={true}
          />
        </div>
        
      ) : (<></>)}

      <ul className="grid">
        {finalResults?.map((result) => (
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