import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { Rating } from 'react-simple-star-rating'
import { useNavigate } from "react-router-dom"

function ChangeUserRating() {
    const params = useParams() 
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()

    const handleRating = (rate) => {
        axios.patch("http://localhost:3000/api/rating/changeRating", 
            {
                country: params.country,
                year: params.year,
                rating: rate
            },
            { withCredentials: true }
        )
        .then(() => {
            setRating(rate)
            toast("Rating successfully updated", {
                icon: "✅"
            })
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
            if (error.response.status === 401) {
                navigate("/account")
            }
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/api/rating/currentUserRating/${params.country}/${params.year}`,
            { withCredentials: true }
        )
        .then((response) => {
            setRating(response.data.rating)
            console.log(response.data.rating)
        })
        .catch(error => {
            console.log(error)
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
            if (error.response.status === 401) {
                navigate("/account")
            }
        })
        
    }, [])

    return (
        <>
            <h1> {params.country}, { params.year } </h1>
            
            <Rating
                onClick={handleRating}
                transition={true}
                initialValue={rating}
                SVGclassName="inline"
            />
            
        </>
    ) 
}

export default ChangeUserRating