import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from './BookModal';
import DeleteModal from './DeleteModal';
import CoverImg from './CoverImg';


const BookSingleCard = ( { book, deleteBook } ) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="bg-lime-50 border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl hover:bg-lime-100">
        <h2 className="absolute top-1 right-2 px-4 py-1 my-1 bg-red-300 rounded-lg">{book.readDate.slice(0,10)}</h2>
        <br></br>
        <div className="flex justify-left">
            <div className="mr-3">    
                <CoverImg book={book} />
            </div>
            
            <div>
                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.title}</h2>
                </div>

                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.author}</h2>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
            <BiShow className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}/>

            <Link to={`/books/update/${book._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
            </Link>
            
            <button onClick={() => {
                // setSelectedBook(book)
                setShowDeleteModal(true)}}>
                <MdOutlineDelete className="text-2xl text-red-600" />
            </button>
        </div>

        {
            showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)} />
            )}
        {
            showDeleteModal && (
                <DeleteModal selectedBook={book} onClose={() => setShowDeleteModal(false)} deleteBook={deleteBook}/>
            )}
    </div>    
  )
}

export default BookSingleCard;