import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import StarRating from '../components/StarRating';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import SaveBookModal from '../components/home/saveBookModal';
import ConfirmSaveModal from '../components/home/confirmSaveModal';

export const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [readDate, setReadDate] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState(null)
  const [loading, setLoading] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookIsbnArr, setBookIsbnArr] = useState([]);
  const book_data = [
    title,
    author,
    readDate,
    summary,
    rating
  ]
  
  const handleSaveBook = () => {
    if (!title || !author || !readDate) {
      alert("Please complete all fields.")
      return
      }
    const data = {
      title,
      author,
      readDate,
      summary,
      rating
    };

    let searchTitle = title.toLowerCase().replace(/ /g,"+");
    let searchAuthor = author.toLowerCase().replace(/ /g,"+");

    axios
      .get(`https://openlibrary.org/search.json?title=${searchTitle}&author=${searchAuthor}&lang=en&fields=isbn`)
      .then((response) => {
        if (response.data.docs.length === 0) {
          setShowConfirmModal(true)
        } else {
          let isbnArray = response.data.docs[0].isbn.slice(0,3);
          setBookIsbnArr(isbnArray)
          setShowModal(true)
        }
      })
    };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? Spinner : ""}
      <div className = "flex flex-col border-2 border-emerald-300 bg-lime-100 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"/>

          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"/>

          <label className="text-xl mr-4 text-gray-500">Completed Date</label>
          <input 
            type="date"
            value={readDate}
            onChange={(e) => {
              setReadDate(e.target.value.substring(0,10))}
            }
            className="border-2 border-gray-500 px-4 py-2 w-full"/>
          <label className="text-xl mr-4 text-gray-500">Rating:</label>
          <StarRating rating={rating} setRating={setRating}/>
          <label className="text-xl mr-4 text-gray-500">Summary</label>
          <textarea 
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="4"
            className="border-2 border-gray-500 px-4 py-2 w-full"/>
          <button className="p-2 rounded-md bg-emerald-300 border-2 m-8 hover:bg-emerald-400" onClick={handleSaveBook}>
            Save
          </button>
        </div>
      </div>
      {
        showModal && (
            <SaveBookModal bookData={book_data} onClose={() => setShowModal(false)} bookIsbnArr={bookIsbnArr}/>
        )
      }
      {
        showConfirmModal && (
          <ConfirmSaveModal bookData={book_data} onClose={() => setShowConfirmModal(false)}/>
        )
      }
    </div>
  )
}

export default CreateBook;