import { Link } from "react-router-dom"

function UserStatsHomePage() {
    return (
        <>
            <Link to="ranking/2025"> Community 2025 Ranking </Link>
            <Link to="ranking/2024"> Community 2024 Ranking </Link>
            <Link to="ranking/2023"> Community 2023 Ranking </Link>
        </>
    )
}

export default UserStatsHomePage