import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Bookshelves from "./Bookshelves/Bookshelves.jsx";
import BookDetails from "./individualBook/individualBookById.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookshelves"
          element={
            <ProtectedRoute>
              <Bookshelves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
