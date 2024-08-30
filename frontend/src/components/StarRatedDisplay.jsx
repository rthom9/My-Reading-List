import React from 'react'
import { AiFillStar } from "react-icons/ai";

const StarRatedDisplay = ( {book} ) => {
    const rating = book.rating
    if (!rating) {
        return "-"
    }
    return (
        <div className="flex justify-center">
        {[...Array(5)].map((star, index) => {
            const currentStarIndex = index + 1
            return (
                <AiFillStar 
                key={index}    
                className={`${currentStarIndex <= (rating) ? `text-yellow-400` : ``}`}
                />
            )
        })}        
    </div>
  )
}

export default StarRatedDisplay