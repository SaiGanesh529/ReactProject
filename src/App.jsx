import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from './Login';
import Home from './Home';

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
