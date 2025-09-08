import { Link } from "react-router-dom"

function ResultsOverviewPage() {
    return (
        <>
            <h1> Offical Eurovision Results from 2021 - 2025 </h1>
            <div className="flex flex-col gap-3 pt-2.5">
                <div><Link to="/countries"> Browse participating countries since 2021 </Link></div>
                <div><Link to="/results/all_results"> View all results from 2021 - 2025</Link></div>
            </div>
        </>
    )
}

export default ResultsOverviewPage