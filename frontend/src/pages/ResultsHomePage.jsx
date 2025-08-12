import { Link } from "react-router-dom"

function ResultsHomePage() {
    return (
        <>
        <h1> Results Home Page</h1>
        <h2> 2025 Results</h2>
        <Link to="/results/final/2025"> 2025 Grand Final Results </Link>
        <Link to="/results/semi/1/2025"> 2025 Semi Final 1 Results </Link>
        <Link to="/results/semi/2/2025"> 2025 Semi Final 2 Results </Link>
        <h2> 2024 Results</h2>
        <Link to="/results/final/2024"> 2024 Grand Final Results </Link>
        <Link to="/results/semi/1/2024"> 2024 Semi Final 1 Results </Link>
        <Link to="/results/semi/2/2024"> 2024 Semi Final 2 Results </Link>
        <h2> 2023 Results</h2>
        <Link to="/results/final/2023"> 2023 Grand Final Results </Link>
        <Link to="/results/semi/1/2023"> 2023 Semi Final 1 Results </Link>
        <Link to="/results/semi/2/2023"> 2023 Semi Final 2 Results </Link>
        <h2> 2022 Results</h2>
        <Link to="/results/final/2022"> 2022 Grand Final Results </Link>
        <Link to="/results/semi/1/2022"> 2022 Semi Final 1 Results </Link>
        <Link to="/results/semi/2/2022"> 2022 Semi Final 2 Results </Link>
        <h2> 2021 Results</h2>
        <Link to="/results/final/2021"> 2021 Grand Final Results </Link>
        <Link to="/results/semi/1/2021"> 2021 Semi Final 1 Results </Link>
        <Link to="/results/semi/2/2021"> 2021 Semi Final 2 Results </Link>
        </>
    )
}

export default ResultsHomePage