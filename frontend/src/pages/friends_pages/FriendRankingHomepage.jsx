import { Link, useParams } from "react-router-dom"
import { useUserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import "../../styles/links.css"

function FriendRankingHomepage() {
    const params = useParams()
    const { user } = useUserContext()
    const navigate = useNavigate()

    return (
        <>
        { user ? (
            <div className="whole_page">
                <h1> View {params.username}'s Rankings </h1>
                <div className="flex flex-col gap-2.5 pt-2.5">
                    <div><Link to={`/friends/${params.username}/ranking/2025`} className="text_link"> 2025 Ranking </Link></div>
                    <div><Link to={`/friends/${params.username}/ranking/2024`} className="text_link"> 2024 Ranking </Link></div>
                    <div><Link to={`/friends/${params.username}/ranking/2023`} className="text_link"> 2023 Ranking </Link></div>
                    <div><Link to={`/friends/${params.username}/ranking/2022`} className="text_link"> 2022 Ranking </Link></div>
                    <div><Link to={`/friends/${params.username}/ranking/2021`} className="text_link"> 2021 Ranking </Link></div>
                </div>
            </div>
        ) : (
            <>
                { navigate("/account") }
            </>
        )}
        
        </>
    )
}

export default FriendRankingHomepage