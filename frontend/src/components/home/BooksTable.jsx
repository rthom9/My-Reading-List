import React, { useState } from 'react'
import DeleteModal from './DeleteModal';
import BookModal from './BookModal';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CoverImg from './CoverImg';
import { AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs"
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import StarRatedDisplay from '../StarRatedDisplay';


export const BooksTable = ( { books, sort_alphabetical, sort_reverse_alphabetical, sort_by_date, setStartDate2, setEndDate2, deleteBook } ) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState({})

    return (
    <div>
        <table className="w-full border-separate border-spacing-2">
            <thead>
                <tr className="[&>*]:bg-lime-100">
                    <th className="border border-slate-600 rounded-md">No.</th>
                    <th className="border border-slate-600 rounded-md">Cover</th>
                    <th className="border border-slate-600 rounded-md">
                        <div>
                            <button id="title" className="flex-none cursor-pointer" onClick={sort_alphabetical}>
                                <IoMdArrowDropup />
                            </button>
                            <button id="title" className="flex-none cursor-pointer" onClick={sort_reverse_alphabetical}>
                                <IoMdArrowDropdown />
                            </button>
                            Title
                        </div>
                    </th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        <div>
                            <button id="author" className="flex-none cursor-pointer" onClick={sort_alphabetical}>
                                <IoMdArrowDropup />
                            </button>
                            <button id="author" className="flex-none cursor-pointer" onClick={sort_reverse_alphabetical}>
                                <IoMdArrowDropdown />
                            </button>
                            Author
                        </div>
                    </th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        <div>
                            <button id="rating" className="flex-none cursor-pointer" onClick={sort_alphabetical}>
                                <IoMdArrowDropup />
                            </button>
                            <button id="rating" className="flex-none cursor-pointer" onClick={sort_reverse_alphabetical}>
                                <IoMdArrowDropdown />
                            </button>
                            Rating
                        </div>
                    </th>
                    <th className="flex justify-center items-center border border-slate-600 rounded-md max-md:hidden">
                        <div>
                            <button id="date" className="flex-none cursor-pointer" onClick={sort_alphabetical}>
                                <IoMdArrowDropup />
                            </button>
                            <button id="date" className="flex-none cursor-pointer" onClick={sort_reverse_alphabetical}>
                                <IoMdArrowDropdown />
                            </button>
                            Date:
                            <DatePicker
                                className="flex-none mx-2 border border-slate-300 rounded-md"
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    setStartDate(start);
                                    setEndDate(end);
                                    setStartDate2(start);
                                    setEndDate2(end);
                                    console.log(startDate, endDate)
                                }}
                                isClearable={true}
                            />
                            <button id="sort_by_date" onClick={sort_by_date} className="flex-none text-sky-800 bg-sky-100 rounded-md px-2 py-1 my-1 hover:text-sky-100 hover:bg-sky-800" >
                                Go
                            </button>
                        </div>
                    </th>
                    <th className="border border-slate-600 rounded-md">Operations</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    return (
                    <tr key={book._id} className="h-8 [&>*]:bg-emerald-100">
                        <td className="border border-slate-700 rounded-md text-center">
                            {index + 1}
                        </td>
                        <td className="flex justify-center items-center border border-slate-700 rounded-md">
                            <CoverImg book={book} />
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            {book.title}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {book.author}
                        </td>
                        <td className="border border-slate-700 rounded-md max-md:hidden">
                            <div className="flex justify-center">
                                <StarRatedDisplay book={book}/>
                            </div>    
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {book.readDate.slice(0,10)}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            <div className="flex justify-center gap-x-4">
                                {/* <Link to={`./books/details/${book._id}`}>
                                    <BsInfoCircle className="text-2xl text-green-800" />
                                </Link> */}
                                <button onClick={() => {
                                    setSelectedBook(book)
                                    setShowBookModal(true)}}>
                                    <BsInfoCircle className="text-2xl text-green-800" />
                                </button>
                                <Link to={`./books/update/${book._id}`}>
                                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                                </Link>
                                {/* <Link to={`./books/delete/${book._id}`}>
                                    <AiOutlineDelete className="text-2xl text-red-600" />
                                </Link> */}
                                <button onClick={() => {
                                    setSelectedBook(book)
                                    setDeleteModal(true)}}>
                                    <AiOutlineDelete className="text-2xl text-red-600" />
                                </button>
                            </div>
                        </td>
                    </tr>   
                )}
            )}
            </tbody>
        </table>
        {
        showDeleteModal && selectedBook && (
            <DeleteModal selectedBook={selectedBook} onClose={() => setDeleteModal(false)} deleteBook={deleteBook}/>
        )}
      {
        showBookModal && selectedBook && (
            <BookModal book={selectedBook} onClose={() => setShowBookModal(false)}/>
        )}
    </div>
  )
}

export default BooksTable