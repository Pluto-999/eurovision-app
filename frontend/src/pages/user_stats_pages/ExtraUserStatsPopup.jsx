import { useEffect, useState } from "react";
import api from "../../utils/axios"
import toast from "react-hot-toast"
import { Rating } from "react-simple-star-rating"

function ExtraUserStatsPopup(props) {
    const [averageRating, setAverageRating] = useState(-1)
    const [averagePosition, setAveragePosition] = useState(-1)
    const [averagePoints, setAveragePoints] = useState(-1)
    const country = props.country
    const year = props.year

    useEffect(() => {
        async function fetchData() {
            try {
                const avgRating = await api.get(`/userstats/avgRating/${country}/${year}`)
                setAverageRating(avgRating.data.data.average)
                
                const avgPosition = await api.get(`/userstats/avgPosition/${country}/${year}`)
                setAveragePosition(avgPosition.data.data.average)

                const avgPoints = await api.get(`/userstats/avgPoints/${country}/${year}`)
                setAveragePoints(avgPoints.data.data.average)
            } catch (error) {
                console.log(error)
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                }
                else {
                    toast.error("Something has gone wrong, please try again")
                }
            }
        }

        fetchData()

    }, [])

    return (
        <>
            <div>
                <h2> Detailed Community Stats</h2>
                <ul>
                    <li>Average Rating: {averageRating > 0 ? (
                        <Rating 
                            initialValue={averageRating}
                            readonly
                            allowFraction
                            SVGclassName="inline"
                        />
                    ) : ( 
                        <Rating 
                            readonly
                            SVGclassName="inline"
                        />
                    )}</li>
                    <li>Average Position: {averagePosition > 0 ? (
                        averagePosition) : ( <> - </>
                    )}</li>
                    <li>Average Points: {averagePoints > 0 ? (
                        averagePoints) : ( <> - </>
                    )}</li>
                </ul>
            </div>
        </>
    )

}

export default ExtraUserStatsPopup
