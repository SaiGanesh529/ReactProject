import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Bookshelves.css";

export default function Bookshelves() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [bookshelfName, setBookshelfName] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        setBooks(data.books || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [bookshelfName, searchText, navigate]);

  return (
    <div className="page">
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Bookshelves</h3>
          <ul>
            <li className={bookshelfName === "ALL" ? "active" : ""} onClick={() => setBookshelfName("ALL")}>All</li>
            <li className={bookshelfName === "READ" ? "active" : ""} onClick={() => setBookshelfName("READ")}>Read</li>
            <li className={bookshelfName === "CURRENTLY_READING" ? "active" : ""} onClick={() => setBookshelfName("CURRENTLY_READING")}>Currently Reading</li>
            <li className={bookshelfName === "WANT_TO_READ" ? "active" : ""} onClick={() => setBookshelfName("WANT_TO_READ")}>Want to Read</li>
          </ul>
        </aside>

        {/* Main */}
        <main>
          <div className="main-header">
            <h2>{bookshelfName.replaceAll("_", " ")}</h2>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* 🔄 Loader */}
          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="books">
              {books.map((book) => (
                <div
                  className="book"
                  key={book.id}
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  <img src={book.cover_pic} alt={book.title} />
                  <div className="info">
                    <h4>{book.title}</h4>
                    <p>{book.author_name}</p>
                    <span className="rating">★ {book.rating}</span>
                    <span className="status">
                      Status : {book.read_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer>
        <FaGoogle />
        <FaTwitter />
        <FaInstagram />
        <FaYoutube />
        <p>Contact Us</p>
      </footer>
    </div>
  );
}
