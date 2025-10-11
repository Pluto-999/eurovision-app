import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Rating } from 'react-simple-star-rating'

function ChangeRating({ country, year }) {
    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
        axios.patch("http://localhost:3000/api/rating/changeRating", 
            {
                country: country,
                year: year,
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
            if (error.response.data.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/api/rating/currentUserRating/${country}/${year}`,
            { withCredentials: true }
        )
        .then((response) => {
            setRating(response.data.rating)
        })
        .catch(error => {
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
        <Rating
            onClick={handleRating}
            transition={true}
            initialValue={rating}
            SVGclassName="inline"
        />
    )
}

export default ChangeRating