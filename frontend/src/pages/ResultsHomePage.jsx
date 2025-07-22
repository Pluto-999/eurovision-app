import { Link } from "react-router-dom"

function ResultsHomePage() {
    return (
        <>
        <h1> Results Home Page</h1>
        <h2> 2025 Results</h2>
        <Link to="/results/final/2025"> 2025 Grand Final Results </Link>
        <Link to="/results/semi/1/2025"> 2025 Semi Final 1 Results </Link>
        <Link to="/results/semi/2/2025"> 2025 Semi Final 2 Results </Link>
        </>
    )
}

export default ResultsHomePage