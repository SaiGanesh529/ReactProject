import React, { useRef } from "react";
import "./TopRatedBooks.css";

function TopRatedBooks({ books }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="top-rated-wrapper">
      <div className="top-rated-header">
        <h2>Top Rated Books</h2>
        <button className="find-books-btn">Find Books</button>
      </div>

      <div className="carousel-container">
        <button className="arrow left" onClick={scrollLeft}>
          ‹
        </button>

        <div className="carousel" ref={sliderRef}>
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <img src={book.cover_pic} alt={book.title} />
              <h4>{book.title}</h4>
              <p>{book.author_name}</p>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
}

export default TopRatedBooks;
