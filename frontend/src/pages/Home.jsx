import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox} from "react-icons/md";

export const Home = () => {
  const [fullBookList, setFullBookList] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const delete_book = (event) => {
    console.log("delete book function", event)
    const id = event.currentTarget.id;
    console.log("delete book id: ", id)
    setLoading(true);
    axios.delete(`http://localhost:5544/books/${id}`)
      .then(() => {
        setLoading(false);
        axios
          .get("http://localhost:5544/books")
            .then((response) => {
              setBooks(response.data.books);
              setFullBookList(response.data.books);
              setLoading(false);
              console.log("Setting books successful");
          }).catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }).catch((error) => {
        setLoading(false);
        alert("Unable to delete book entry.");
        console.log(error);
      })
  }
  const sort_alphabetical = (event) => {
    const btn = event.currentTarget.id;
    console.log("asc", event.currentTarget)
    const books_response = [...books];
    if (btn === "title") {
      books_response.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    if (btn === "author") {
      books_response.sort((a, b) => {
        return a.author.localeCompare(b.author);
      });
    }
    if (btn === "date") {
      console.log("sorting by date")
      books_response.sort((a, b) => {
        return new Date(a.readDate) - new Date(b.readDate);
      });
    }
    if (btn === "rating") {
      console.log("sort asc rating")
      books_response.sort((a, b) => {
        if (!a.rating) {
          return 1;
        }
        if (!b.rating) {
          return -1;
        }
        return a.rating - b.rating;
      });
    }
    setBooks([...books_response]);
  };

  const sort_reverse_alphabetical = (event) => {
    const btn = event.currentTarget.id;
    console.log("asc", event.currentTarget)
    const books_response = [...books];
    if (btn === "title") {
      books_response.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }
    if (btn === "author") {
      console.log("sort desc rating")
      books_response.sort((a, b) => {
        return b.author.localeCompare(a.author);
      });
    }
    if (btn === "date") {
      console.log("sorting by date")
      books_response.sort((a, b) => {
        return new Date(b.readDate) - new Date(a.readDate);
      });
    }
    if (btn === "rating") {
      console.log("sort desc rating")
      books_response.sort((a, b) => {
        if (!a.rating) {
          return 1;
        }
        if (!b.rating) {
          return -1;
        }
        return b.rating - a.rating;
      });
    }
    setBooks([...books_response]);
  };

  const sort_by_date = () => {
    console.log("Sort date function", startDate, endDate);
    if (!startDate || !endDate) {
      console.log(books)
      console.log("null dates")
      axios
      .get("http://localhost:5544/books")
      .then((response) => {
        setBooks(response.data.books);
        setFullBookList(response.data.books);
        setLoading(false);
        console.log("Setting books successful");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
    if (startDate && endDate) {
      // Create UTC versions of startDate and endDate
      const startDateObj = new Date(Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
      ));
  
      const endDateObj = new Date(Date.UTC(
        endDate.getUTCFullYear(),
        endDate.getUTCMonth(),
        endDate.getUTCDate()
      ));
      endDateObj.setUTCHours(23, 59, 59, 999); // Set to the end of the day in UTC
  
      console.log("Normalized Start Date (UTC):", startDateObj);
      console.log("Normalized End Date (UTC):", endDateObj);
  
      // Filter books by the normalized dates
      const books_response_dated = books.filter((book_entry) => {
        const readDateObj = new Date(book_entry.readDate);
        const readDateUTC = new Date(Date.UTC(
          readDateObj.getUTCFullYear(),
          readDateObj.getUTCMonth(),
          readDateObj.getUTCDate()
        ));
  
        console.log("Book Read Date (UTC):", readDateUTC);
        return (
          readDateUTC.getTime() >= startDateObj.getTime() &&
          readDateUTC.getTime() <= endDateObj.getTime()
        );
      });
  
      console.log("Filtered Books:", books_response_dated);
      setBooks(books_response_dated);
    }
  };

  const reset_dates = () => {
    setStartDate(null);
    setEndDate(null);
    setBooks(fullBookList);
  };

  const deleteAll = () => {
    console.log("Delete all")
    axios
      .delete("http://localhost:5544/books")
      .then((response) => {
        setBooks(response.data.books);
        setFullBookList(response.data.books);
        setLoading(false);
        console.log("Setting books successful");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5544/books")
      .then((response) => {
        setBooks(response.data.books);
        setFullBookList(response.data.books);
        setLoading(false);
        console.log("Setting books successful");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-4 font-mono">My Reading List</h1>
        
      </div>
      <div className="flex justify-end items-center gap-x-4">
        Display: 
        <button
          className="border border-slate-600 rounded-md bg-amber-100 hover:bg-amber-200 px-4 py-1"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="border border-slate-600 rounded-md bg-amber-100 hover:bg-amber-200 px-4 py-1"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : showType === "table" ? (
        <BooksTable
          books={books}
          sort_alphabetical={sort_alphabetical} 
          sort_reverse_alphabetical={sort_reverse_alphabetical}
          sort_by_date={sort_by_date}
          reset_dates={reset_dates}
          setStartDate2={setStartDate}
          setEndDate2={setEndDate}
          deleteBook={delete_book}
        />) : (
        <BooksCard books={books} deleteBook={delete_book}/>)
      }
    </div>
  );
};

export default Home;
