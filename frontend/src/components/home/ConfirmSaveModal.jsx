import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const ConfirmSaveModal = ({ bookData, onClose }) => {
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();

    let title = bookData[0];
    let author = bookData[1];
    let readDate = bookData[2];
    let summary = bookData[3];
    let rating = bookData[4];

    const handleSaveBook = () => {
      const data = {
        title,
        author,
        readDate,
        summary,
        rating
      };
      setLoading(true)
      axios.post("http://localhost:5544/books", data)
        .then(() => {
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          alert("Error: Unable to add book.")
          console.log(error)
        })
    }

    return (
    <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
    onClick={onClose}>
        <div 
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
        >
            <AiOutlineClose
                className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
                onClick={onClose}
            />
            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className="text-red-300 text-2xl" />
                <h2 className="my-1">{bookData[0]}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
                <BiUserCircle className="text-red-300 text-2xl" />
                <h2 className="my-1">{bookData[1]}</h2>
            </div>
            <p>No ISBN found for book entry. Still save?</p>
            <button onClick={handleSaveBook} className="w-40 p-2 bg-sky-300 m-2">
                Yes
            </button>
            <button onClick={onClose} className="w-40 p-2 bg-sky-300 m-2">
                No
            </button>
        </div>

    </div>
  )
}

export default ConfirmSaveModal;