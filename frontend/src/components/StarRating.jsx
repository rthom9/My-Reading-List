import React, { useState } from 'react'
import { AiFillStar } from "react-icons/ai";

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null)
    return (
    <div className="flex justify-center">
        {[...Array(5)].map((star, index) => {
            const currentRating = index + 1
            return (
                <label key={index}>
                    <input
                        type="radio"
                        name="rating" 
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                        className="hidden"
                    />
                    <AiFillStar 
                        className={`cursor-pointer ${currentRating <= (hover || rating) ? `text-yellow-400` : ``}`}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        />
                </label>
            )
        })}        
    </div>
  )
}

export default StarRating