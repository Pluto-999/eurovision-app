import { useEffect, useState } from "react"
import axios from "axios"
import OtherUserRanking from "./OtherUserRanking"
import { Link, useParams } from "react-router-dom"

function FriendAccountPage() {
    const params = useParams()

    return (
        <Link to={`/friends/${params.username}/ranking/2025`}> 2025 Ranking </Link>
    )
}

export default FriendAccountPage