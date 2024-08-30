import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';

export const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
        <Link to={destination} className="bg-orange-200 hover:bg-orange-300 px-4 py-1 border-2 border-orange-400 rounded-full w-fit">
            <BsArrowLeft className="text-2xl" />
        </Link>
    </div>
  )
}

export default BackButton
