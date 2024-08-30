import React, { useState } from 'react';
import { MdOutlineImageNotSupported } from "react-icons/md";
import Spinner from '../Spinner';

const CoverImg = ({ book }) => {
  const [loading, setLoading] = useState(true);

  // Image available
  if (book.imgUrl) {
    return (
      <div className="relative flex justify-center items-center">
        {loading && <Spinner />} {/* Show spinner while loading */}
        <img 
          src={book.imgUrl} 
          className={`max-h-20 ${loading ? 'hidden' : 'block'}`} 
          onLoad={() => setLoading(false)} 
          onError={() => setLoading(false)} 
          alt="Book cover"
        />
      </div>
    );
  } 
  // No image available
  else {
    return (
      <div className="flex items-center">
        <MdOutlineImageNotSupported />
        <span className="ml-2">No img</span>
      </div>
    );
  }
};

export default CoverImg;