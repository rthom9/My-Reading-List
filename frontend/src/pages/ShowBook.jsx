import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import StarRatedDisplay from '../components/StarRatedDisplay';

export const ShowBook = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5544/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
        console.log(response.data.book)
        console.log(book)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? ( <Spinner />) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          {book.rating ? (
            <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Rating</span>
            <span><StarRatedDisplay book={book}/></span>
            </div>
          ) : (null)}          
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Date Read</span>
            <span>{book.readDate ? book.readDate.slice(0, 10) : 'No date available'}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Summary</span>
            <textarea rows="4">{book.summary}</textarea>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook;