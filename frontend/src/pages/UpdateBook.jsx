import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import StarRating from '../components/StarRating';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom"

export const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [readDate, setReadDate] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState("")
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5544/books/${id}`)
      .then((response) => {
        setAuthor(response.data.book.author);
        setReadDate(response.data.book.readDate);
        setTitle(response.data.book.title);
        setSummary(response.data.summary);
        setRating(response.data.rating);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert("Unable to edit book entry.");
        console.log(error)
      })
  }, [])
  const handleUpdateBook = () => {
    const data = {
      title,
      author,
      readDate,
      summary,
      rating
    };
    setLoading(true)
    axios.put(`http://localhost:5544/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error: Unable to update book entry.")
        console.log(error)
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
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
          
          <label className="text-xl mr-4 text-gray-500">Rating:</label>
          <StarRating rating={rating} setRating={setRating}/>
          
          <label className="text-xl mr-4 text-gray-500">Completed Date</label>
          <input 
            type="text"
            value={readDate ? readDate.slice(0,10) : null}
            onChange={(e) => setReadDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"/>

          <label className="text-xl mr-4 text-gray-500">Summary</label>
          <textarea 
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="4"
            className="border-2 border-gray-500 px-4 py-2 w-full"/>

          <button className="p-2 rounded-md bg-emerald-300 border-2 m-8 hover:bg-emerald-400" onClick={handleUpdateBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook;