import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube, FaArrowRight } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://apis.ccbp.in/book-hub/top-rated-books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 4 < books.length) {
      setStartIndex(prev => prev + 4);
    } else {
      setStartIndex(0); // Loop back to start
    }
  };

  const visibleBooks = books.slice(startIndex, startIndex + 4);

  return (
    <div className="home-page">
      {/* HERO (centered) */}
      <div className="home-container">
        <div className="home-hero">
          <h1>Find Your Next Favorite Books?</h1>
          <p>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
        </div>
      </div>

      {/* TOP RATED (full width section) */}
      <div className="top-rated-wrapper">
        <div className="top-rated-section">
          <div className="top-rated-header">
            <h2>Top Rated Books</h2>
            <div className="header-actions">
              <button className="find-books-btn" onClick={() => navigate("/bookshelves")}>
                Find Books
              </button>
              <button className="next-books-btn" onClick={handleNext}>
                <FaArrowRight />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="books-slider">
              {visibleBooks.map(book => (
                <div key={book.id} className="book-card">
                  <img src={book.cover_pic} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.author_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER (centered) */}
      <div className="home-container">
        <div className="home-footer">
          <div className="social-icons">
            <FaGoogle />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
          <p className="contact-text">Contact Us</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
