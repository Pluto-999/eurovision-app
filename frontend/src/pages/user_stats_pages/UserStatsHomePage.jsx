import { Link } from "react-router-dom"

function UserStatsHomePage() {
    return (
        <div className="whole_page">
            <h1> Community Rankings Home Page </h1>
            <div className="flex flex-col gap-2.5 pt-2.5">
                <div><Link to="ranking/2025"> Community 2025 Ranking </Link></div>
                <div><Link to="ranking/2024"> Community 2024 Ranking </Link></div>
                <div><Link to="ranking/2023"> Community 2023 Ranking </Link></div>
                <div><Link to="ranking/2022"> Community 2022 Ranking </Link></div>
                <div><Link to="ranking/2021"> Community 2021 Ranking </Link></div>
            </div>
        </div>
    )
}

export default UserStatsHomePage