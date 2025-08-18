import { Link, useParams } from "react-router-dom"

function FriendRankingHomepage() {
    const params = useParams()

    return (
        <>
            <Link to={`/friends/${params.username}/ranking/2025`}> 2025 Ranking </Link>
            <Link to={`/friends/${params.username}/ranking/2024`}> 2024 Ranking </Link>
            <Link to={`/friends/${params.username}/ranking/2023`}> 2023 Ranking </Link>
            <Link to={`/friends/${params.username}/ranking/2022`}> 2022 Ranking </Link>
            <Link to={`/friends/${params.username}/ranking/2021`}> 2021 Ranking </Link>
        </>
    )
}

export default FriendRankingHomepage