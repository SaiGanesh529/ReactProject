import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://apis.ccbp.in/book-hub/top-rated-books",
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        console.log('Fetched books:', data);

        // adjust key if API response differs
        setBooks(data.books || []);
      } catch (error) {
        console.log('Error fetching books:', error);
      }
    };

    const token = localStorage.getItem("jwt_token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchBooks();
  }, [navigate]);

  console.log('Books:', books);

  return (
    <div className="home-container">
      <div className="books-list">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-item"
          >
            <img
              className="book-cover"
              src={book.cover_pic}
              alt={book.title}
            />
            <p className="book-title">
              {book.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
