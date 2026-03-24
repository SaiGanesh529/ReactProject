import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./individualBookById.css";

export default function IndividualBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://apis.ccbp.in/book-hub/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch book");
        }

        const data = await res.json();
        setBook(data.book_details);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id, navigate]);

  if (!book) return null;

  return (
    <div className="book-details-page">
      <div className="book-card">
        <div className="book-top">
          <img
            src={book.cover_pic}
            alt={book.title}
            className="book-cover"
          />

          <div className="book-info">
            <h1>{book.title}</h1>
            <p className="author">{book.author_name}</p>

            <p className="rating">
              Avg Rating <span>★ {book.rating}</span>
            </p>

            <p className="status">
              Status : <span>{book.read_status}</span>
            </p>
          </div>
        </div>

        <hr />

        <div className="about-section">
          <h2>About Author</h2>
          <p>{book.about_author}</p>
        </div>

        <div className="about-section">
          <h2>About Book</h2>
          <p>{book.about_book}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="icons">
          <FaGoogle />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>
        <p>Contact Us</p>
      </footer>
    </div>
  );
}
